import type { DateTimeValue } from '../DateTimePicker/DateTimePicker'

/**
 * Contrato de dados do CreativeCard (Business Component).
 *
 * Tipos do domínio "criativo": o asset e seu conteúdo de texto, a linha do tempo
 * de validação e o `Creative` em si. A apresentação de status **não** vive aqui —
 * é derivada de `state` em `creativeLifecycle.ts` (fonte única).
 */

/**
 * Conteúdo estruturado de um asset de texto, vindo do `.txt` de um formato
 * composto. Cada formato declara o "esquema" de texto que espera; a união abaixo
 * é discriminada por `variant`, mantendo o preview e os metadados type-safe.
 */
export type CreativeTextContent = CreativeCtaText | CreativeTitleText

/** Texto de CTA (ex.: Touchpoint Imagético): rótulo do botão e cores. */
export interface CreativeCtaText {
  variant: 'cta'
  /** Texto exibido no botão de call-to-action. */
  ctaText: string
  /** Cor de fundo do botão — `#hex` vindo do arquivo. */
  buttonColor: string
  /** Cor do texto do botão — `#hex` vindo do arquivo. */
  textColor: string
}

/** Texto de título + subtítulo (ex.: Carrossel Native). */
export interface CreativeTitleText {
  variant: 'titulo-subtitulo'
  /** Título da peça. */
  title: string
  /** Subtítulo da peça. */
  subtitle: string
}

/**
 * Uma peça que compõe um criativo. Formatos simples têm um único asset
 * (derivado dos campos de topo do `Creative`); formatos compostos — enviados
 * como `.zip` — têm vários (ex.: Touchpoint Imagético: Desktop, Mobile e CTA).
 */
export interface CreativeAsset {
  id: string
  /** Rótulo legível da peça (ex.: "Touchpoint Imagético - DESKTOP"). */
  label: string
  /** Decide como o preview é renderizado. */
  kind: 'image' | 'text' | 'video'
  /** Object URL / caminho da imagem — quando `kind === 'image'`. */
  imageSrc?: string
  /** Object URL / caminho do vídeo — quando `kind === 'video'`. */
  videoSrc?: string
  /** Conteúdo estruturado — quando `kind === 'text'`. */
  text?: CreativeTextContent
  /** Extensão do arquivo (ex.: "JPG", "TXT", "MP4"). */
  extension: string
  /** Dimensão em pixels (ex.: "1920x100") — para imagens e vídeos. */
  dimension?: string
  /** Duração (ex.: "0:15") — só para vídeos. */
  duration?: string
  /** Tamanho do arquivo (ex.: "100 kB"). */
  size: string
}

/**
 * Estado do criativo no ciclo de vida de validação — fonte única do status.
 * A apresentação (badge/label) é derivada em `CREATIVE_STATUS`.
 *
 * - `configuring`: adicionado à galeria, editável, ainda não enviado ("Pronto para anunciar").
 * - `analyzing`: enviado e em validação interna da Globo ("Em análise").
 * - `approved`: validação concluída com sucesso ("Aprovado").
 * - `rejected`: validação recusada ("Recusado").
 */
export type CreativeState = 'configuring' | 'analyzing' | 'approved' | 'rejected'

/** Etapa do processo de validação do criativo (aba "Etapas de validação"). */
export type ValidationStepType = 'added' | 'analyzing' | 'rejected' | 'approved'

/**
 * Um evento na linha do tempo de validação. A cor/semântica do passo é derivada
 * de `type` — não há campo de variante. Os passos vivem em ordem cronológica
 * crescente; o último é o estado atual do criativo.
 */
export interface ValidationStep {
  type: ValidationStepType
  /** Título do passo (ex.: "Criativo recusado"). */
  title: string
  /** Data e hora já formatadas (ex.: "07/07/2024 às 16:15h"). */
  timestamp: string
  /** Texto descritivo do passo. */
  description: string
  /** Motivo destacado em caixa critical — parágrafos. Só em `rejected`. */
  reason?: string[]
  /** Link inline ao fim da descrição (ex.: "crie um novo anúncio…"). */
  link?: string
}

/**
 * Controla quais blocos de configuração são exibidos no card e no drawer.
 * Campo omitido ou `true` = visível; `false` = oculto.
 */
export interface CreativeFieldsConfig {
  /** Período de veiculação (início + fim). */
  period?: boolean
  /** URL de destino. */
  url?: boolean
  /** Pixel de rastreamento. */
  pixel?: boolean
  /** Posição. */
  position?: boolean
}

/**
 * Um criativo publicitário. Carrega os campos exibidos no card e os metadados
 * extras consumidos pelo drawer de detalhes. O status é derivado de `state`.
 */
export interface Creative {
  id: string
  /** Nome do arquivo enviado pelo usuário. */
  name: string
  /** Tipo de mídia do criativo (default `image`). */
  kind?: 'image' | 'video'
  /** Imagem de preview do criativo. */
  imageSrc: string
  /** Object URL / caminho do vídeo — quando `kind === 'video'`. */
  videoSrc?: string
  /** Duração do vídeo (ex.: "0:15") — quando `kind === 'video'`. */
  duration?: string
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
  /** Estado no ciclo de vida de validação — fonte única do status. */
  state: CreativeState
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
  /** Posição selecionada — value das opções de posição. */
  position?: string
  /**
   * Peças que compõem o criativo, para formatos multi-asset (enviados como
   * `.zip`). Ausente em formatos simples — nesse caso o drawer deriva um único
   * asset dos campos de topo. Quando presente, os campos de topo
   * (`imageSrc`/`dimension`/`extension`/`size`) refletem a peça de capa.
   */
  assets?: CreativeAsset[]
  /** Linha do tempo de validação, em ordem cronológica crescente. */
  validation?: ValidationStep[]
}
