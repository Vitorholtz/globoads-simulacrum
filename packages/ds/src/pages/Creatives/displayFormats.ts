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

/** Extensões de vídeo aceitas em formatos de Vídeo. */
export type VideoFileType = 'MP4' | 'MOV' | 'AVI'

export interface DisplayDimension {
  width: number
  height: number
  /** Rótulo da variante (ex.: "Desktop" | "Mobile"), quando o formato tem mais de uma. */
  label?: string
}

/**
 * Esquema do `.txt` de uma peça de texto — define como o conteúdo é interpretado
 * e renderizado: `cta` (rótulo + cores do botão) ou `titulo-subtitulo`.
 */
export type TextSchema = 'cta' | 'titulo-subtitulo'

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
  /** Esquema do `.txt` — obrigatório quando `kind === 'text'`. */
  textSchema?: TextSchema
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
    id: 'pause-ads',
    name: 'Pause Ads',
    dimensions: [{ width: 996, height: 640 }],
    acceptedFileTypes: ['PNG'],
    staticKB: 900,
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
        textSchema: 'cta',
        required: true,
      },
    ],
  },
  {
    id: 'carrossel',
    name: 'Carrossel',
    dimensions: [{ width: 400, height: 300 }],
    acceptedFileTypes: ['JPG', 'PNG'],
    staticKB: 150,
    composite: [
      ...([1, 2, 3, 4] as const).map(
        (n): CompositeAssetSpec => ({
          id: `imagem-${n}`,
          label: `Carrossel - Imagem ${n}`,
          kind: 'image',
          dimension: { width: 400, height: 300 },
          acceptedFileTypes: ['JPG', 'PNG'],
          required: true,
        })
      ),
      {
        id: 'texto',
        label: 'Texto do Carrossel',
        kind: 'text',
        textSchema: 'titulo-subtitulo',
        required: true,
      },
    ],
  },
  {
    id: 'binge-ads',
    name: 'Binge Ads',
    dimensions: [
      { width: 996, height: 640, label: 'Peça principal' },
      { width: 25, height: 25, label: 'Logotipo' },
    ],
    acceptedFileTypes: ['JPG', 'PNG'],
    staticKB: 1024,
    composite: [
      {
        id: 'principal',
        label: 'Binge Ads - Peça principal',
        kind: 'image',
        dimension: { width: 996, height: 640, label: 'Peça principal' },
        acceptedFileTypes: ['JPG', 'PNG'],
        required: true,
      },
      {
        id: 'logotipo',
        label: 'Binge Ads - Logotipo',
        kind: 'image',
        dimension: { width: 25, height: 25, label: 'Logotipo' },
        acceptedFileTypes: ['JPG', 'PNG'],
        required: true,
      },
    ],
  },
]

/**
 * Formato de **Vídeo** do catálogo (espelha `in-stream-video` de
 * `apps/simulacrum/src/data/catalog/adFormats.ts`).
 *
 * Nesta etapa, qualquer vídeo enviado é classificado como In-Stream Vídeo —
 * por isso há um único formato e nenhuma função de match por dimensão.
 */
export interface VideoFormat {
  id: string
  name: string
  /** Dimensões de referência (não bloqueiam a classificação). */
  dimensions: DisplayDimension[]
  acceptedFileTypes: VideoFileType[]
  /** Limite de peso do arquivo de vídeo, em MB. */
  videoMB: number
}

export const VIDEO_FORMAT: VideoFormat = {
  id: 'in-stream-video',
  name: 'In-Stream Vídeo',
  dimensions: [
    { width: 1280, height: 720, label: '720p' },
    { width: 1920, height: 1080, label: '1080p' },
  ],
  acceptedFileTypes: ['MP4', 'MOV', 'AVI'],
  videoMB: 512,
}

/** Formatos compostos do catálogo (declaram `composite`). */
export const COMPOSITE_FORMATS: DisplayFormat[] = DISPLAY_FORMATS.filter(
  (format): format is DisplayFormat & { composite: CompositeAssetSpec[] } =>
    format.composite !== undefined
)

/**
 * Encontra o formato Display **simples** (não composto) cujas dimensões batem
 * exatamente com a peça enviada. Formatos compostos são ignorados aqui — só são
 * alcançáveis via `.zip` (`matchCompositeFormat`) —, evitando que uma imagem
 * solta caia num formato multi-asset que compartilhe a mesma dimensão (ex.: a
 * peça principal 996x640 do Binge Ads vs. o Pause Ads). Retorna `null` quando
 * nenhuma dimensão simples do catálogo corresponde.
 */
export function matchDisplayFormat(width: number, height: number): DisplayFormat | null {
  return (
    DISPLAY_FORMATS.find(
      (format) =>
        !format.composite && format.dimensions.some((d) => d.width === width && d.height === height)
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
