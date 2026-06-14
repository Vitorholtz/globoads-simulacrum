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
  },
]

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
