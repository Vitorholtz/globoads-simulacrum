import {
  initialValidationSteps,
  formatStepTimestamp,
} from '../../components/CreativeCard/creativeLifecycle'
import type {
  Creative,
  CreativeAsset,
  CreativeTextContent,
} from '../../components/CreativeCard/types'
import {
  matchDisplayFormat,
  matchCompositeFormat,
  VIDEO_FORMAT,
  type DisplayFileType,
  type DisplayFormat,
  type CompositeAssetSpec,
  type TextSchema,
  type VideoFileType,
} from './displayFormats'
import { unzip, type ZipEntry } from './unzip'

/**
 * Classificação automática de um criativo enviado pelo usuário.
 *
 * Lê as características técnicas do arquivo (dimensões, peso, extensão) usando
 * apenas APIs nativas do browser — sem dependências externas — e identifica a
 * qual formato publicitário **Display** ele pertence, derivando um `Creative`
 * pronto para virar card.
 *
 * O fluxo despacha por família de MIME para abrir espaço à evolução futura
 * (Vídeo via `<video>`, Native via descompactação de .zip) sem reescrita.
 */
export type ClassifyResult = { ok: true; creative: Creative } | { ok: false; reason: string }

/** Mapeia o MIME da imagem para a extensão usada no catálogo Display. */
const IMAGE_MIME_TO_TYPE: Record<string, DisplayFileType> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/gif': 'GIF',
}

/** Mapeia a extensão de arquivo (dentro do `.zip`) para o tipo Display. */
const IMAGE_EXT_TO_TYPE: Record<string, DisplayFileType> = {
  jpg: 'JPG',
  jpeg: 'JPG',
  png: 'PNG',
  gif: 'GIF',
}

/** Mapeia o tipo Display de volta para o MIME — para montar Blobs do `.zip`. */
const TYPE_TO_MIME: Record<DisplayFileType, string> = {
  JPG: 'image/jpeg',
  PNG: 'image/png',
  GIF: 'image/gif',
}

/** Mapeia o MIME do vídeo para a extensão usada no catálogo de Vídeo. */
const VIDEO_MIME_TO_TYPE: Record<string, VideoFileType> = {
  'video/mp4': 'MP4',
  'video/quicktime': 'MOV',
  'video/x-msvideo': 'AVI',
  'video/avi': 'AVI',
}

/** Mapeia a extensão do nome para o tipo de vídeo — cobre MIME vazio (.mov/.avi). */
const VIDEO_EXT_TO_TYPE: Record<string, VideoFileType> = {
  mp4: 'MP4',
  mov: 'MOV',
  avi: 'AVI',
}

export async function classifyCreative(file: File): Promise<ClassifyResult> {
  // Despacho por família: imagem solta (Display), vídeo (In-Stream) ou .zip (composto).
  if (file.type.startsWith('image/')) {
    return classifyImage(file)
  }
  if (file.type.startsWith('video/') || isVideoByName(file)) {
    return classifyVideo(file)
  }
  if (isZip(file)) {
    return classifyZip(file)
  }
  return {
    ok: false,
    reason: 'Envie uma imagem (Display), um vídeo (In-Stream) ou um .zip de formato composto.',
  }
}

/** Reconhece um vídeo pela extensão do nome — fallback quando o MIME vem vazio. */
function isVideoByName(file: File): boolean {
  return extensionOf(file.name) in VIDEO_EXT_TO_TYPE
}

/** Reconhece um `.zip` por MIME ou pela extensão do nome. */
function isZip(file: File): boolean {
  return (
    file.type === 'application/zip' ||
    file.type === 'application/x-zip-compressed' ||
    file.name.toLowerCase().endsWith('.zip')
  )
}

async function classifyImage(file: File): Promise<ClassifyResult> {
  const fileType = IMAGE_MIME_TO_TYPE[file.type]
  if (!fileType) {
    return { ok: false, reason: 'Extensão de imagem não suportada. Use JPG, PNG ou GIF.' }
  }

  const objectUrl = URL.createObjectURL(file)
  let dimensions: { width: number; height: number }
  try {
    dimensions = await readImageDimensions(objectUrl)
  } catch {
    URL.revokeObjectURL(objectUrl)
    return { ok: false, reason: 'Não foi possível ler a imagem enviada.' }
  }

  const { width, height } = dimensions
  const format = matchDisplayFormat(width, height)
  if (!format) {
    URL.revokeObjectURL(objectUrl)
    return {
      ok: false,
      reason: `Dimensão ${width}x${height} não corresponde a nenhum formato Display do catálogo.`,
    }
  }

  if (!format.acceptedFileTypes.includes(fileType)) {
    URL.revokeObjectURL(objectUrl)
    return {
      ok: false,
      reason: `${format.name} não aceita arquivos ${fileType}. Aceitos: ${format.acceptedFileTypes.join(', ')}.`,
    }
  }

  const sizeKB = Math.round(file.size / 1024)
  if (sizeKB > format.staticKB) {
    URL.revokeObjectURL(objectUrl)
    return {
      ok: false,
      reason: `Peso de ${sizeKB} kB acima do limite de ${format.staticKB} kB para ${format.name}.`,
    }
  }

  return {
    ok: true,
    creative: {
      id: `${slugify(file.name)}-${Date.now()}`,
      name: file.name,
      imageSrc: objectUrl,
      format: format.name,
      dimension: `${width}x${height}`,
      extension: fileType,
      size: `${sizeKB} kB`,
      uploadedAt: formatUploadedAt(new Date()),
      state: 'analyzing',
      validation: initialValidationSteps(formatStepTimestamp(new Date())),
    },
  }
}

/**
 * Classifica um vídeo solto. Por simplificação desta etapa, **qualquer** vídeo
 * aceito vira In-Stream Vídeo, independentemente da dimensão — só validamos
 * extensão e peso. Lê dimensões e duração (via `<video>`) apenas para metadados.
 */
async function classifyVideo(file: File): Promise<ClassifyResult> {
  const fileType = VIDEO_MIME_TO_TYPE[file.type] ?? VIDEO_EXT_TO_TYPE[extensionOf(file.name)]
  if (!fileType) {
    return { ok: false, reason: 'Extensão de vídeo não suportada. Use MP4, MOV ou AVI.' }
  }

  const sizeMB = file.size / (1024 * 1024)
  if (sizeMB > VIDEO_FORMAT.videoMB) {
    return {
      ok: false,
      reason: `Peso de ${formatFileSize(file.size)} acima do limite de ${VIDEO_FORMAT.videoMB} MB para ${VIDEO_FORMAT.name}.`,
    }
  }

  const objectUrl = URL.createObjectURL(file)
  let meta: { width: number; height: number; duration: number }
  try {
    meta = await readVideoMetadata(objectUrl)
  } catch {
    URL.revokeObjectURL(objectUrl)
    return { ok: false, reason: 'Não foi possível ler o vídeo enviado.' }
  }

  return {
    ok: true,
    creative: {
      id: `${slugify(file.name)}-${Date.now()}`,
      name: file.name,
      kind: 'video',
      imageSrc: '',
      videoSrc: objectUrl,
      duration: formatDuration(meta.duration),
      format: VIDEO_FORMAT.name,
      dimension: `${meta.width}x${meta.height}`,
      extension: fileType,
      size: formatFileSize(file.size),
      uploadedAt: formatUploadedAt(new Date()),
      state: 'analyzing',
      validation: initialValidationSteps(formatStepTimestamp(new Date())),
    },
  }
}

/** Uma entrada do `.zip` já lida tecnicamente, pronta para virar `CreativeAsset`. */
type ParsedEntry =
  | {
      kind: 'image'
      name: string
      fileType: DisplayFileType
      width: number
      height: number
      sizeKB: number
      imageSrc: string
    }
  | { kind: 'text'; name: string; sizeKB: number; raw: string }

/**
 * Classifica um `.zip` de formato composto: descompacta, lê cada peça, casa o
 * conjunto contra o catálogo de formatos compostos e valida peça a peça contra
 * o manifesto (`DisplayFormat.composite`). Em sucesso, monta um `Creative` com
 * `assets[]` — capa = primeira imagem na ordem do manifesto.
 */
async function classifyZip(file: File): Promise<ClassifyResult> {
  let entries: ZipEntry[]
  try {
    entries = await unzip(file)
  } catch {
    return { ok: false, reason: 'Não foi possível ler o arquivo .zip enviado.' }
  }

  const files = entries.filter((e) => !e.name.endsWith('/'))
  if (files.length === 0) {
    return { ok: false, reason: 'O .zip não contém arquivos.' }
  }

  // Lê tecnicamente cada entrada. URLs de imagem são revogadas se a validação
  // falhar adiante, evitando vazar object URLs de um upload inválido.
  const created: string[] = []
  const parsed: ParsedEntry[] = []
  for (const entry of files) {
    const ext = extensionOf(entry.name)
    const fileType = IMAGE_EXT_TO_TYPE[ext]
    const sizeKB = Math.round(entry.bytes.byteLength / 1024)
    if (fileType) {
      const url = URL.createObjectURL(new Blob([entry.bytes], { type: TYPE_TO_MIME[fileType] }))
      created.push(url)
      try {
        const { width, height } = await readImageDimensions(url)
        parsed.push({
          kind: 'image',
          name: entry.name,
          fileType,
          width,
          height,
          sizeKB,
          imageSrc: url,
        })
      } catch {
        return fail(created, `Não foi possível ler a imagem "${entry.name}" do .zip.`)
      }
    } else if (ext === 'txt') {
      // Guarda o conteúdo cru; a interpretação (CTA ou título/subtítulo) é
      // decidida pela peça do manifesto (`spec.textSchema`) em `resolveAsset`.
      const raw = new TextDecoder().decode(entry.bytes)
      parsed.push({ kind: 'text', name: entry.name, sizeKB, raw })
    }
    // Demais extensões são ignoradas — não fazem parte de nenhum manifesto.
  }

  const format = matchCompositeFormat(
    parsed.map((p) =>
      p.kind === 'image' ? { kind: 'image', width: p.width, height: p.height } : { kind: 'text' }
    )
  )
  if (!format || !format.composite) {
    return fail(created, 'O .zip não corresponde a nenhum formato composto do catálogo.')
  }

  // Resolve e valida cada peça do manifesto, montando os assets em ordem.
  // `used` garante que peças idênticas (ex.: 4 imagens 400x300 do Carrossel)
  // sejam atribuídas a slots distintos, sem reaproveitar o mesmo arquivo.
  const assets: CreativeAsset[] = []
  const used = new Set<ParsedEntry>()
  for (const spec of format.composite) {
    const result = resolveAsset(spec, parsed, used, format)
    if (!result.ok) return fail(created, result.reason)
    if (result.asset) assets.push(result.asset)
  }

  const cover = assets.find((a) => a.kind === 'image') ?? assets[0]
  return {
    ok: true,
    creative: {
      id: `${slugify(file.name)}-${Date.now()}`,
      name: file.name.replace(/\.zip$/i, ''),
      imageSrc: cover.imageSrc ?? '',
      format: format.name,
      dimension: cover.dimension ?? '',
      extension: cover.extension,
      size: cover.size,
      uploadedAt: formatUploadedAt(new Date()),
      state: 'analyzing',
      validation: initialValidationSteps(formatStepTimestamp(new Date())),
      assets,
    },
  }
}

/**
 * Resolve uma peça do manifesto contra as entradas lidas, validando-a. As
 * entradas escolhidas são marcadas em `used` para não serem reaproveitadas por
 * outra peça (essencial quando há peças de dimensão idêntica, como o Carrossel).
 */
function resolveAsset(
  spec: CompositeAssetSpec,
  parsed: ParsedEntry[],
  used: Set<ParsedEntry>,
  format: DisplayFormat
): { ok: true; asset?: CreativeAsset } | { ok: false; reason: string } {
  if (spec.kind === 'image') {
    const dim = spec.dimension!
    const match = parsed.find(
      (p): p is Extract<ParsedEntry, { kind: 'image' }> =>
        p.kind === 'image' && !used.has(p) && p.width === dim.width && p.height === dim.height
    )
    if (!match) {
      if (!spec.required) return { ok: true }
      return {
        ok: false,
        reason: `Falta a peça "${spec.label}" (${dim.width}x${dim.height}) no .zip.`,
      }
    }
    if (spec.acceptedFileTypes && !spec.acceptedFileTypes.includes(match.fileType)) {
      return {
        ok: false,
        reason: `${spec.label} não aceita ${match.fileType}. Aceitos: ${spec.acceptedFileTypes.join(', ')}.`,
      }
    }
    if (match.sizeKB > format.staticKB) {
      return {
        ok: false,
        reason: `${spec.label}: ${match.sizeKB} kB acima do limite de ${format.staticKB} kB.`,
      }
    }
    used.add(match)
    return {
      ok: true,
      asset: {
        id: spec.id,
        label: spec.label,
        kind: 'image',
        imageSrc: match.imageSrc,
        extension: match.fileType,
        dimension: `${match.width}x${match.height}`,
        size: `${match.sizeKB} kB`,
      },
    }
  }

  // Peça de texto — interpretada conforme o esquema declarado no manifesto.
  const match = parsed.find(
    (p): p is Extract<ParsedEntry, { kind: 'text' }> => p.kind === 'text' && !used.has(p)
  )
  if (!match) {
    if (!spec.required) return { ok: true }
    return { ok: false, reason: `Falta a peça de texto "${spec.label}" (.txt) no .zip.` }
  }
  const schema = spec.textSchema ?? 'cta'
  const text = parseTextBySchema(match.raw, schema)
  if (!text) {
    return { ok: false, reason: `Não foi possível ler "${spec.label}". ${TEXT_HINT[schema]}` }
  }
  used.add(match)
  return {
    ok: true,
    asset: {
      id: spec.id,
      label: spec.label,
      kind: 'text',
      text,
      extension: 'TXT',
      size: `${match.sizeKB} kB`,
    },
  }
}

/** Revoga as object URLs criadas e devolve um resultado de falha. */
function fail(createdUrls: string[], reason: string): ClassifyResult {
  createdUrls.forEach(URL.revokeObjectURL)
  return { ok: false, reason }
}

/** Extensão (minúscula, sem ponto) do nome de um arquivo. */
function extensionOf(name: string): string {
  const match = /\.([^.]+)$/.exec(name)
  return match ? match[1].toLowerCase() : ''
}

/** Dica exibida quando o `.txt` não pôde ser lido, por esquema de texto. */
const TEXT_HINT: Record<TextSchema, string> = {
  cta: 'Use linhas como "cta=...", "corBotao=#...", "corTexto=#...".',
  'titulo-subtitulo': 'Use linhas como "titulo=..." e "subtitulo=...".',
}

/** Interpreta o conteúdo cru do `.txt` conforme o esquema declarado no manifesto. */
function parseTextBySchema(content: string, schema: TextSchema): CreativeTextContent | null {
  return schema === 'cta' ? parseCtaText(content) : parseTitleText(content)
}

/** Lê um `.txt` em pares `chave=valor` (ou `chave: valor`) num mapa normalizado. */
function readKeyValues(content: string): Map<string, string> {
  const fields = new Map<string, string>()
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    const sep = line.search(/[:=]/)
    if (sep < 0) continue
    const key = normalizeKey(line.slice(0, sep))
    const value = line.slice(sep + 1).trim()
    if (key && value && !fields.has(key)) fields.set(key, value)
  }
  return fields
}

/** Encontra o primeiro valor cuja chave satisfaz o predicado. */
function findValue(
  fields: Map<string, string>,
  match: (key: string) => boolean
): string | undefined {
  for (const [key, value] of fields) {
    if (match(key)) return value
  }
  return undefined
}

/**
 * Lê o `.txt` do CTA num formato `chave=valor` (ou `chave: valor`) tolerante:
 * uma chave com "cta" vira o texto; "botao"/"fundo" a cor do botão; "cor"/"color"
 * a cor do texto. Retorna `null` se faltar algum dos três campos.
 *
 * Exemplo aceito:
 *   cta=Assine agora
 *   corBotao=#F2630A
 *   corTexto=#FFFFFF
 */
function parseCtaText(content: string): CreativeTextContent | null {
  const fields = readKeyValues(content)
  // A chave da cor do botão (ex.: "corBotao") também contém "cor"; por isso o
  // critério de cor do texto exclui as chaves de botão, senão "corBotao" seria
  // capturado pelos dois campos (e a cor do texto herdaria a cor do botão).
  const isButtonKey = (k: string) =>
    k.includes('botao') || k.includes('fundo') || k.includes('background') || k === 'bg'
  const ctaText = findValue(fields, (k) => k.includes('cta') || k === 'texto' || k === 'text')
  const buttonColor = findValue(fields, isButtonKey)
  const textColor = findValue(
    fields,
    (k) => !isButtonKey(k) && (k.includes('cor') || k.includes('color'))
  )
  if (!ctaText || !buttonColor || !textColor) return null
  return {
    variant: 'cta',
    ctaText,
    buttonColor: normalizeHex(buttonColor),
    textColor: normalizeHex(textColor),
  }
}

/**
 * Lê o `.txt` de título/subtítulo (Carrossel) num formato `chave=valor` tolerante:
 * uma chave com "titulo" vira o título; "subtitulo" o subtítulo. Retorna `null`
 * se faltar algum dos dois campos.
 *
 * Exemplo aceito:
 *   titulo=Café Orfeu
 *   subtitulo=O melhor da serra na sua xícara
 */
function parseTitleText(content: string): CreativeTextContent | null {
  const fields = readKeyValues(content)
  // "subtitulo" inclui "titulo"; por isso o subtítulo é resolvido primeiro.
  const subtitle = findValue(fields, (k) => k.includes('subtitulo') || k.includes('subtitle'))
  const title = findValue(
    fields,
    (k) => (k.includes('titulo') || k.includes('title')) && !k.includes('sub')
  )
  if (!title || !subtitle) return null
  return { variant: 'titulo-subtitulo', title, subtitle }
}

/** Normaliza a chave: minúscula, sem acentos, só letras e números. */
function normalizeKey(key: string): string {
  return key
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '')
}

/** Garante o `#` inicial e o hex em maiúsculas. */
function normalizeHex(value: string): string {
  return `#${value.trim().replace(/^#/, '').toUpperCase()}`
}

/** Lê as dimensões naturais de uma imagem a partir de um object URL. */
function readImageDimensions(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = () => reject(new Error('image load error'))
    img.src = src
  })
}

/** Lê dimensões e duração de um vídeo a partir de um object URL. */
function readVideoMetadata(
  src: string
): Promise<{ width: number; height: number; duration: number }> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () =>
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
        duration: video.duration,
      })
    video.onerror = () => reject(new Error('video load error'))
    video.src = src
  })
}

/** Formata segundos como m:ss (ex.: 15 → "0:15"). Vazio quando indefinido. */
function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return ''
  const s = Math.round(totalSeconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Formata bytes como kB (< 1 MB) ou MB, no padrão pt-BR (vírgula decimal). */
function formatFileSize(bytes: number): string {
  const kb = bytes / 1024
  if (kb < 1024) return `${Math.round(kb)} kB`
  return `${(kb / 1024).toFixed(1).replace('.', ',')} MB`
}

/** Converte o nome do arquivo (sem extensão) num slug seguro para id. */
function slugify(fileName: string): string {
  return (
    fileName
      .replace(/\.[^.]+$/, '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'criativo'
  )
}

/** Formata a data atual no padrão exibido nos cards: "DD/MM às HHhMM". */
function formatUploadedAt(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)} às ${pad(date.getHours())}h${pad(date.getMinutes())}`
}
