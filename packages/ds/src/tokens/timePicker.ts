import type { GuidelineDef } from './types'

export type TimePickerSize = 'sm' | 'md' | 'lg'

/** A 24h time value as independent hour/minute components. */
export interface TimeValue {
  hours: number
  minutes: number
}

export type TimePickerSizeDef = {
  id: TimePickerSize
  label: string
  paddingY: number
  paddingX: number
  fontSize: number
  iconSize: number
  description: string
  recommended?: boolean
}

export const TIME_PICKER_SIZES: TimePickerSizeDef[] = [
  {
    id: 'sm',
    label: 'Small',
    paddingY: 6,
    paddingX: 8,
    fontSize: 14,
    iconSize: 16,
    description: 'Tabelas densas, filtros compactos, formulários com muitos campos.',
  },
  {
    id: 'md',
    label: 'Medium',
    paddingY: 8,
    paddingX: 12,
    fontSize: 16,
    iconSize: 20,
    description: 'Tamanho padrão para a maioria dos formulários e campos de horário.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'Large',
    paddingY: 12,
    paddingX: 12,
    fontSize: 16,
    iconSize: 24,
    description: 'Destaque visual em formulários de cadastro, landing pages e onboarding.',
  },
]

export const TIME_PICKER_STATES = [
  { id: 'normal', label: 'Normal', description: 'Estado padrão em repouso.' },
  { id: 'hover', label: 'Hover', description: 'Cursor sobre o campo — borda escurece.' },
  { id: 'focus', label: 'Focus', description: 'Campo ativo com foco — borda azul 2px.' },
  { id: 'active', label: 'Active', description: 'Painel de horário aberto com seleção visível.' },
  { id: 'error', label: 'Error', description: 'Horário inválido — borda e fundo crítico.' },
  { id: 'disabled', label: 'Disabled', description: 'Campo indisponível — opacidade 48%.' },
] as const

export const TIME_PICKER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Formato 24 horas consistente',
    body: 'Use sempre o formato HH:MM (24 horas) para horários. O placeholder deve refletir esse formato para orientar o preenchimento manual sem depender do painel.',
    rule: 'HH:MM em 24 horas — sem AM/PM.',
  },
  {
    title: 'Painel como atalho, não obrigação',
    body: 'O usuário deve poder preencher o horário manualmente ou ajustá-lo pelo painel de horas e minutos. Nunca bloqueie a digitação direta — isso é essencial para acessibilidade e velocidade.',
    rule: 'Digitação manual e painel são caminhos equivalentes.',
  },
  {
    title: 'Incrementos de horas e minutos',
    body: 'No painel, as horas avançam de 1 em 1 e os minutos de 10 em 10, com retorno ao início ao ultrapassar o limite (23h → 00h, 50min → 00min). Esses incrementos seguem a granularidade comum de agendamentos.',
    rule: 'Horas: passo de 1. Minutos: passo de 10.',
  },
  {
    title: 'Feedback de erro ao completar o campo',
    body: 'Valide o horário assim que os 5 caracteres (HH:MM) forem preenchidos, não a cada dígito digitado. O estado de erro mostra fundo rosado, borda crítica e texto explicativo abaixo do campo.',
    rule: 'Valide ao completar HH:MM — nunca a cada dígito.',
  },
]

export const TIME_PICKER_MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'active' | 'error' | 'disabled' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'active', label: 'Active', force: 'active' },
  { id: 'error', label: 'Error', force: 'error' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]

export const TIME_PICKER_MATRIX_COLS: { id: string; label: string; filled: boolean }[] = [
  { id: 'placeholder', label: 'Placeholder', filled: false },
  { id: 'filled', label: 'Filled', filled: true },
]
