import type { BadgeVariant } from '../../tokens/badge'
import type { Creative, CreativeState, ValidationStep } from './types'

/**
 * Fonte única do ciclo de vida do criativo.
 *
 * Centraliza a taxonomia de status (antes *stringly-typed* e espalhada): a
 * apresentação do badge é derivada do `state`, as transições são explícitas e a
 * linha do tempo de validação é construída a partir do estado. Tanto o card e o
 * drawer quanto a classificação de upload e a simulação consomem só este módulo.
 */

export interface CreativeStatusPresentation {
  /** Rótulo do status no badge. */
  label: string
  /** Variante semântica do badge. */
  variant: BadgeVariant
  /** Texto-link sublinhado após o status; clicável (rejected → abre validação). */
  link?: string
}

/** Apresentação do status por estado — derivação única para o badge. */
export const CREATIVE_STATUS: Record<CreativeState, CreativeStatusPresentation> = {
  configuring: { label: 'Pronto para anunciar', variant: 'neutral' },
  analyzing: { label: 'Em análise', variant: 'warning' },
  approved: { label: 'Aprovado', variant: 'success' },
  rejected: { label: 'Recusado', variant: 'critical', link: 'Ver detalhes' },
}

/** Ação de simulação que transiciona o estado de um criativo. */
export type CreativeAction = 'send' | 'approve' | 'reject'

/** Transições válidas: estado de origem → destino. */
const TRANSITIONS: Record<CreativeAction, { from: CreativeState; to: CreativeState }> = {
  send: { from: 'configuring', to: 'analyzing' },
  approve: { from: 'analyzing', to: 'approved' },
  reject: { from: 'analyzing', to: 'rejected' },
}

/**
 * Aplica uma transição de ciclo de vida a um criativo: valida a origem, avança o
 * `state` e anexa o passo correspondente à linha do tempo. Retorna o mesmo
 * criativo (sem mutação) quando a transição não é válida para o estado atual.
 */
export function applyTransition(
  creative: Creative,
  action: CreativeAction,
  reason?: string[]
): Creative {
  const transition = TRANSITIONS[action]
  if (creative.state !== transition.from) return creative
  const timestamp = formatStepTimestamp(new Date())
  return {
    ...creative,
    state: transition.to,
    validation: [...(creative.validation ?? []), stepForState(transition.to, timestamp, reason)],
  }
}

/** Passo de validação que representa a entrada num estado. */
function stepForState(state: CreativeState, timestamp: string, reason?: string[]): ValidationStep {
  switch (state) {
    case 'analyzing':
      return analyzingStep(timestamp)
    case 'approved':
      return approvedStep(timestamp)
    case 'rejected':
      return rejectedStep(timestamp, reason ?? ['Motivo não informado.'])
    case 'configuring':
      return addedStep(timestamp, { unlinked: true })
  }
}

const ANALYZING_DESCRIPTION =
  'O seu criativo está sendo analisado pela equipe de operações comerciais da Globo.'

/**
 * Passo "adicionado à galeria". `unlinked` traz o texto + link da peça que ainda
 * não foi vinculada a um anúncio (igual à referência de design).
 */
export function addedStep(timestamp: string, options?: { unlinked?: boolean }): ValidationStep {
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

export function analyzingStep(timestamp: string): ValidationStep {
  return {
    type: 'analyzing',
    title: 'Criativo em análise',
    timestamp,
    description: ANALYZING_DESCRIPTION,
  }
}

export function approvedStep(timestamp: string): ValidationStep {
  return {
    type: 'approved',
    title: 'Criativo aprovado',
    timestamp,
    description: 'O seu criativo foi aprovado e já pode ser veiculado nos anúncios vinculados.',
  }
}

export function rejectedStep(timestamp: string, reason: string[]): ValidationStep {
  return {
    type: 'rejected',
    title: 'Criativo recusado',
    timestamp,
    description: 'O seu criativo foi recusado. Confira o motivo abaixo:',
    reason,
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

/** Formata a data no padrão das etapas de validação: "DD/MM/AAAA às HH:MMh". */
export function formatStepTimestamp(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} às ${pad(date.getHours())}:${pad(date.getMinutes())}h`
}
