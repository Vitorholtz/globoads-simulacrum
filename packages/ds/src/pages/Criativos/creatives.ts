import type { BadgeVariant } from '../../tokens/badge'
import type { DateTimeValue } from '../../components/DateTimePicker/DateTimePicker'

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
  /** Texto do status do criativo. */
  status: string
  /** Variante semântica do badge de status. */
  statusVariant: BadgeVariant
  /**
   * Texto-link sublinhado exibido após o status (ex.: "Ver detalhes" no
   * Reprovado). Quando presente, o link abre o drawer na aba de validação.
   */
  statusLink?: string
  /**
   * Renderiza o próprio status como link sublinhado, sem ação por enquanto
   * (ex.: "Pronto para anunciar").
   */
  statusAsLink?: boolean
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

const ANALYZING_DESCRIPTION =
  'O seu criativo está sendo analisado pela equipe de operações comerciais da Globo.'

/**
 * Passo "adicionado à galeria". `unlinked` traz o texto + link da peça que ainda
 * não foi vinculada a um anúncio (igual à referência de design).
 */
function addedStep(timestamp: string, options?: { unlinked?: boolean }): ValidationStep {
  if (options?.unlinked) {
    return {
      type: 'added',
      title: 'Criativo adicionado à galeria',
      timestamp,
      description:
        'Seu criativo ainda não está vinculado a nenhum anúncio. Para enviá-lo para a validação da Globo, vincule-o a um anúncio existente ou',
      link: 'crie um novo anúncio utilizando este criativo.',
    }
  }
  return {
    type: 'added',
    title: 'Criativo adicionado à galeria',
    timestamp,
    description: 'Seu criativo foi adicionado à galeria e enviado para a validação da Globo.',
  }
}

function analyzingStep(timestamp: string): ValidationStep {
  return {
    type: 'analyzing',
    title: 'Criativo em análise',
    timestamp,
    description: ANALYZING_DESCRIPTION,
  }
}

function approvedStep(timestamp: string): ValidationStep {
  return {
    type: 'approved',
    title: 'Criativo aprovado',
    timestamp,
    description: 'O seu criativo foi aprovado e já pode ser veiculado nos anúncios vinculados.',
  }
}

/**
 * Linha do tempo inicial de um criativo recém-enviado pelo upload: adicionado à
 * galeria e em análise. Reutilizada por `classifyCreative`.
 */
export function initialValidationSteps(timestamp: string): ValidationStep[] {
  return [addedStep(timestamp), analyzingStep(timestamp)]
}

/**
 * Linha do tempo de um criativo ainda em configuração — adicionado à galeria mas
 * não enviado para análise. Tem só o passo "adicionado à galeria".
 */
export function addedOnlyValidation(timestamp: string): ValidationStep[] {
  return [addedStep(timestamp, { unlinked: true })]
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
    validation: [
      addedStep('17/05/2025 às 15:30h'),
      analyzingStep('17/05/2025 às 15:35h'),
      approvedStep('18/05/2025 às 10:12h'),
    ],
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
    status: 'Em análise',
    statusVariant: 'warning',
    tag: 'Clube Orfeu',
    position: 'segunda',
    validation: [addedStep('02/06/2025 às 09:12h'), analyzingStep('02/06/2025 às 09:20h')],
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
    statusLink: 'Ver detalhes',
    position: 'terceira',
    validation: [
      addedStep('24/12/2024 às 18:00h', { unlinked: true }),
      analyzingStep('25/12/2024 às 09:30h'),
      {
        type: 'rejected',
        title: 'Criativo recusado',
        timestamp: '25/12/2024 às 20:45h',
        description: 'O seu criativo foi recusado. Confira o motivo abaixo:',
        reason: ['O criativo não tem logotipo.'],
      },
    ],
  },
  {
    id: 'in-stream-cafe-orfeu-gerador-de-criativos',
    name: 'video-cafe-orfeu-gerador-de-criativos',
    kind: 'video',
    imageSrc: '',
    videoSrc: '/video-cafe-orfeu-gerador-de-criativos.mp4',
    duration: '0:15',
    format: 'In-Stream Vídeo',
    dimension: '1920x1080',
    extension: 'MP4',
    size: '8,4 MB',
    uploadedAt: '10/06 às 14h05',
    status: 'Pronto para anunciar',
    statusVariant: 'neutral',
    statusAsLink: true,
    position: 'primeira',
    validation: [addedStep('10/06/2025 às 14:05h', { unlinked: true })],
  },
]
