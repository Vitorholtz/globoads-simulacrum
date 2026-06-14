import type { Creative } from './creatives'
import { matchDisplayFormat, type DisplayFileType } from './displayFormats'

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

export async function classifyCreative(file: File): Promise<ClassifyResult> {
  // Despacho por família de MIME — só Display (imagens) é suportado por ora.
  if (file.type.startsWith('image/')) {
    return classifyImage(file)
  }
  return {
    ok: false,
    reason: 'Apenas criativos de imagem (Display) são suportados no momento.',
  }
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
