import type { BadgeVariant } from '../../tokens/badge'
import type { DateTimeValue } from '../../components/DateTimePicker/DateTimePicker'

/**
 * Fonte única dos criativos do Playground.
 *
 * As três galerias da CriativosPage mapeiam esta lista — evita duplicar os
 * mesmos criativos inline em cada card. Carrega tanto os campos exibidos nos
 * cards quanto os metadados extras consumidos pelo drawer de detalhes.
 */
export interface Creative {
  id: string
  /** Nome do arquivo enviado pelo usuário. */
  name: string
  /** Imagem de preview do criativo. */
  imageSrc: string
  /** Formato comercial (ex.: "Billboard"). */
  format: string
  /** Dimensão em pixels (ex.: "970x250"). */
  dimension: string
  /** Extensão do arquivo (ex.: "JPG"). */
  extension: string
  /** Tamanho do arquivo (ex.: "100 kB"). */
  size: string
  /** Data e hora do upload, já formatadas para exibição. */
  uploadedAt: string
  /** Texto do status do criativo. */
  status: string
  /** Variante semântica do badge de status. */
  statusVariant: BadgeVariant
  /** Tag de categoria opcional. */
  tag?: string
  /** Período da campanha — início. */
  startDateTime?: DateTimeValue
  /** Período da campanha — fim. */
  endDateTime?: DateTimeValue
  /** URL de destino. */
  destinationUrl?: string
  /** Pixel de rastreamento. */
  pixel?: string
  /** Posição selecionada — value de POSITION_OPTIONS. */
  position?: string
}

export const CREATIVES: Creative[] = [
  {
    id: 'billboard-home-clube-orfeu',
    name: 'billboard-home-clube-orfeu',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '100 kB',
    uploadedAt: '17/05 às 15h30',
    status: 'Aprovado',
    statusVariant: 'success',
    tag: 'Clube Orfeu',
    position: 'primeira',
  },
  {
    id: 'banner-home-clube-orfeu-2025-promo-verao',
    name: 'banner-home-clube-orfeu-2025-promo-verao',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '128 kB',
    uploadedAt: '02/06 às 09h12',
    status: 'Em revisão',
    statusVariant: 'warning',
    tag: 'Clube Orfeu',
    position: 'segunda',
  },
  {
    id: 'masthead-globo-com-campanha-natal',
    name: 'masthead-globo-com-campanha-natal',
    imageSrc: '/Billboard.jpg',
    format: 'Billboard',
    dimension: '970x250',
    extension: 'JPG',
    size: '96 kB',
    uploadedAt: '25/12 às 20h45',
    status: 'Recusado',
    statusVariant: 'critical',
    position: 'terceira',
  },
]
