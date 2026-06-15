/**
 * Catálogo local dos formatos publicitários da categoria **Display** (imagens).
 *
 * Espelha o subconjunto Display de `AD_FORMATS_CATALOG`
 * (`apps/simulacrum/src/data/catalog/adFormats.ts`). Vive aqui porque o DS
 * **nunca** importa do Simulacrum (regra de direção de dependência do
 * workspace) — esta é a fonte usada pela classificação automática de upload do
 * Playground. Ao evoluir para Vídeo/Native, promover para uma fonte compartilhada.
 */

/** Extensões de imagem aceitas em formatos Display. */
export type DisplayFileType = 'JPG' | 'PNG' | 'GIF'

export interface DisplayDimension {
  width: number
  height: number
  /** Rótulo da variante (ex.: "Desktop" | "Mobile"), quando o formato tem mais de uma. */
  label?: string
}

/**
 * Especificação de uma peça de um formato **composto** (multi-asset, enviado
 * como `.zip`). O catálogo declara as peças esperadas; a classificação valida o
 * conteúdo do `.zip` contra esta lista — sem lógica específica por formato.
 */
export interface CompositeAssetSpec {
  id: string
  /** Rótulo exibido para a peça (ex.: "Touchpoint Imagético - DESKTOP"). */
  label: string
  /** Tipo da peça — decide a forma de validação e de preview. */
  kind: 'image' | 'text'
  /** Dimensão exata exigida — obrigatória quando `kind === 'image'`. */
  dimension?: DisplayDimension
  /** Tipos de arquivo aceitos — para `kind === 'image'`. */
  acceptedFileTypes?: DisplayFileType[]
  /** Se a peça é obrigatória para o criativo ser válido. */
  required: boolean
}

export interface DisplayFormat {
  id: string
  /** Nome comercial exibido (ex.: "Half-Page"). */
  name: string
  /** Dimensões válidas em pixels — match exato resolve a classificação. */
  dimensions: DisplayDimension[]
  /** Tipos de arquivo estático aceitos. */
  acceptedFileTypes: DisplayFileType[]
  /** Limite de peso para peça estática, em kB. */
  staticKB: number
  /**
   * Peças esperadas quando o formato é composto (enviado como `.zip`). Presente
   * = formato multi-asset; ausente = formato simples (um arquivo só).
   */
  composite?: CompositeAssetSpec[]
}

export const DISPLAY_FORMATS: DisplayFormat[] = [
  {
    id: 'billboard',
    name: 'Billboard',
    dimensions: [{ width: 970, height: 250 }],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 250,
  },
  {
    id: 'maxiboard',
    name: 'Maxiboard',
    dimensions: [{ width: 970, height: 150 }],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 200,
  },
  {
    id: 'super-leaderboard',
    name: 'Super Leaderboard',
    dimensions: [{ width: 970, height: 90 }],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 150,
  },
  {
    id: 'half-page',
    name: 'Half-Page',
    dimensions: [{ width: 300, height: 600 }],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 250,
  },
  {
    id: 'retangulo-medio',
    name: 'Retângulo Médio',
    dimensions: [{ width: 300, height: 250 }],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 150,
  },
  {
    id: 'sticky-ad',
    name: 'Sticky Ad',
    dimensions: [
      { width: 320, height: 50 },
      { width: 320, height: 100 },
    ],
    acceptedFileTypes: ['JPG', 'PNG', 'GIF'],
    staticKB: 100,
  },
  {
    id: 'touchpoint-imagetico',
    name: 'Touchpoint Imagético',
    dimensions: [
      { width: 1920, height: 100, label: 'Desktop' },
      { width: 430, height: 140, label: 'Mobile' },
    ],
    acceptedFileTypes: ['JPG', 'PNG'],
    staticKB: 250,
    composite: [
      {
        id: 'desktop',
        label: 'Touchpoint Imagético - DESKTOP',
        kind: 'image',
        dimension: { width: 1920, height: 100, label: 'Desktop' },
        acceptedFileTypes: ['JPG', 'PNG'],
        required: true,
      },
      {
        id: 'mobile',
        label: 'Touchpoint Imagético - MOBILE',
        kind: 'image',
        dimension: { width: 430, height: 140, label: 'Mobile' },
        acceptedFileTypes: ['JPG', 'PNG'],
        required: true,
      },
      {
        id: 'cta',
        label: 'CTA-Touchpoint',
        kind: 'text',
        required: true,
      },
    ],
  },
]

/** Formatos compostos do catálogo (declaram `composite`). */
export const COMPOSITE_FORMATS: DisplayFormat[] = DISPLAY_FORMATS.filter(
  (format): format is DisplayFormat & { composite: CompositeAssetSpec[] } =>
    format.composite !== undefined
)

/**
 * Encontra o formato Display cujas dimensões batem exatamente com a peça enviada.
 * Retorna `null` quando nenhuma dimensão do catálogo corresponde.
 */
export function matchDisplayFormat(width: number, height: number): DisplayFormat | null {
  return (
    DISPLAY_FORMATS.find((format) =>
      format.dimensions.some((d) => d.width === width && d.height === height)
    ) ?? null
  )
}

/** Peça extraída de um `.zip`, classificada por tipo, para casar com o catálogo. */
export interface ExtractedAsset {
  kind: 'image' | 'text'
  /** Dimensões da imagem — quando `kind === 'image'`. */
  width?: number
  height?: number
}

/**
 * Identifica a qual formato **composto** um conjunto de peças extraídas de um
 * `.zip` pertence. Pontua cada formato pelas peças de imagem cujas dimensões
 * aparecem entre as extraídas e escolhe o de melhor encaixe (>= 1 imagem).
 *
 * O match é tolerante de propósito: identifica o formato mesmo com peças
 * faltando, para que a validação detalhada (em `classifyZip`) acuse o que falta.
 * Retorna `null` quando nenhuma imagem corresponde a nenhum formato composto.
 */
export function matchCompositeFormat(assets: ExtractedAsset[]): DisplayFormat | null {
  const images = assets.filter((a) => a.kind === 'image')
  let best: DisplayFormat | null = null
  let bestScore = 0
  for (const format of COMPOSITE_FORMATS) {
    const imageSpecs = format.composite!.filter((spec) => spec.kind === 'image')
    const score = imageSpecs.filter((spec) =>
      images.some(
        (img) => img.width === spec.dimension!.width && img.height === spec.dimension!.height
      )
    ).length
    if (score > bestScore) {
      best = format
      bestScore = score
    }
  }
  return best
}
