import type { Creative, CreativeAsset, CreativeTextContent } from './creatives'
import {
  matchDisplayFormat,
  matchCompositeFormat,
  type DisplayFileType,
  type DisplayFormat,
  type CompositeAssetSpec,
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

export async function classifyCreative(file: File): Promise<ClassifyResult> {
  // Despacho por família: imagem solta (Display) ou .zip (formato composto).
  if (file.type.startsWith('image/')) {
    return classifyImage(file)
  }
  if (isZip(file)) {
    return classifyZip(file)
  }
  return {
    ok: false,
    reason: 'Envie uma imagem (Display) ou um .zip de formato composto.',
  }
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
      status: 'Em revisão',
      statusVariant: 'warning',
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
  | { kind: 'text'; name: string; sizeKB: number; text: CreativeTextContent | null }

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
      const text = parseCtaText(new TextDecoder().decode(entry.bytes))
      parsed.push({ kind: 'text', name: entry.name, sizeKB, text })
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
  const assets: CreativeAsset[] = []
  for (const spec of format.composite) {
    const result = resolveAsset(spec, parsed, format)
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
      status: 'Em revisão',
      statusVariant: 'warning',
      assets,
    },
  }
}

/** Resolve uma peça do manifesto contra as entradas lidas, validando-a. */
function resolveAsset(
  spec: CompositeAssetSpec,
  parsed: ParsedEntry[],
  format: DisplayFormat
): { ok: true; asset?: CreativeAsset } | { ok: false; reason: string } {
  if (spec.kind === 'image') {
    const dim = spec.dimension!
    const match = parsed.find(
      (p): p is Extract<ParsedEntry, { kind: 'image' }> =>
        p.kind === 'image' && p.width === dim.width && p.height === dim.height
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
    return {
      ok: true,
      asset: {
        id: `${spec.id}-${match.width}x${match.height}`,
        label: spec.label,
        kind: 'image',
        imageSrc: match.imageSrc,
        extension: match.fileType,
        dimension: `${match.width}x${match.height}`,
        size: `${match.sizeKB} kB`,
      },
    }
  }

  // Peça de texto (ex.: CTA).
  const match = parsed.find((p): p is Extract<ParsedEntry, { kind: 'text' }> => p.kind === 'text')
  if (!match) {
    if (!spec.required) return { ok: true }
    return { ok: false, reason: `Falta a peça de texto "${spec.label}" (.txt) no .zip.` }
  }
  if (!match.text) {
    return {
      ok: false,
      reason: `Não foi possível ler "${spec.label}". Use linhas como "cta=...", "corBotao=#...", "corTexto=#...".`,
    }
  }
  return {
    ok: true,
    asset: {
      id: spec.id,
      label: spec.label,
      kind: 'text',
      text: match.text,
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
  const fields: Partial<CreativeTextContent> = {}
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim()
    const sep = line.search(/[:=]/)
    if (sep < 0) continue
    const key = normalizeKey(line.slice(0, sep))
    const value = line.slice(sep + 1).trim()
    if (!value) continue
    if (
      (key.includes('cta') || key === 'texto' || key === 'text') &&
      fields.ctaText === undefined
    ) {
      fields.ctaText = value
    } else if (
      (key.includes('botao') ||
        key.includes('fundo') ||
        key.includes('background') ||
        key === 'bg') &&
      fields.buttonColor === undefined
    ) {
      fields.buttonColor = normalizeHex(value)
    } else if ((key.includes('cor') || key.includes('color')) && fields.textColor === undefined) {
      fields.textColor = normalizeHex(value)
    }
  }
  if (!fields.ctaText || !fields.buttonColor || !fields.textColor) return null
  return { ctaText: fields.ctaText, buttonColor: fields.buttonColor, textColor: fields.textColor }
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
