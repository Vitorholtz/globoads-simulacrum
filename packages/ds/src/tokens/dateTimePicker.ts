import type { GuidelineDef } from './types'
import type { TimeValue } from './timePicker'

export type DateTimePickerSize = 'sm' | 'md' | 'lg'

/** Combined date + time value selected through the two-step panel. */
export interface DateTimeValue {
  date: Date
  time: TimeValue
}

export type DateTimePickerSizeDef = {
  id: DateTimePickerSize
  label: string
  paddingY: number
  paddingX: number
  fontSize: number
  iconSize: number
  description: string
  recommended?: boolean
}

export const DATE_TIME_PICKER_SIZES: DateTimePickerSizeDef[] = [
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
    description: 'Tamanho padrão para a maioria dos formulários de agendamento.',
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

export const DATE_TIME_PICKER_STATES = [
  { id: 'normal', label: 'Normal', description: 'Estado padrão em repouso.' },
  { id: 'hover', label: 'Hover', description: 'Cursor sobre o campo — borda escurece.' },
  { id: 'focus', label: 'Focus', description: 'Campo ativo com foco — borda azul 2px.' },
  {
    id: 'active',
    label: 'Active',
    description: 'Painel de data ou horário aberto com seleção visível.',
  },
  { id: 'error', label: 'Error', description: 'Seleção inválida — borda e fundo crítico.' },
  {
    id: 'readonly',
    label: 'Read Only',
    description: 'Somente leitura — valor legível e não editável, sem realce de interação.',
  },
  { id: 'disabled', label: 'Disabled', description: 'Campo indisponível — opacidade 48%.' },
] as const

export const DATE_TIME_PICKER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Fluxo sequencial: data e depois horário',
    body: 'Ao abrir o componente, o usuário vê primeiro o calendário. Ao confirmar a data, o painel avança automaticamente para a seleção de horário. Confirmar o horário fecha o componente e exibe os dois valores no campo.',
    rule: 'Data → Confirmar → Horário → Confirmar → fecha.',
  },
  {
    title: 'Um único campo para os dois valores',
    body: 'O campo exibe data e horário lado a lado, separados por uma seta, no formato DD/MM/AAAA → HH:MM. Use esse componente quando data e horário formam um único momento (início de um agendamento), em vez de dois campos separados.',
    rule: 'DD/MM/AAAA → HH:MM em um único campo.',
  },
  {
    title: 'Painéis como atalho, não obrigação',
    body: 'O usuário deve poder digitar a data e o horário diretamente nos campos ou ajustá-los pelo calendário e pelo painel de horário. Ao abrir o painel, ele reflete os valores já digitados — digitação e seleção permanecem sincronizadas.',
    rule: 'Digitação manual e painéis são caminhos equivalentes e sincronizados.',
  },
  {
    title: 'Voltar preserva o progresso, cancelar descarta tudo',
    body: 'Na etapa de horário, a seta de voltar retorna ao calendário sem perder o horário já ajustado. Já o botão "Cancelar", em qualquer etapa, fecha o painel sem alterar o valor confirmado anteriormente.',
    rule: 'Voltar mantém o progresso; Cancelar descarta a seleção.',
  },
  {
    title: 'Campo opcional explícito',
    body: 'Marque campos de data e horário opcionais com a tag "Opcional". Em formulários onde todos os campos são opcionais, omita a marcação para reduzir ruído visual.',
    rule: 'Marque o opcional, não o obrigatório.',
  },
]

export const DATE_TIME_PICKER_MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'active' | 'error' | 'disabled' | 'readonly' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'active', label: 'Active', force: 'active' },
  { id: 'error', label: 'Error', force: 'error' },
  { id: 'readonly', label: 'Read Only', force: 'readonly' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]

export const DATE_TIME_PICKER_MATRIX_COLS: { id: string; label: string; filled: boolean }[] = [
  { id: 'placeholder', label: 'Placeholder', filled: false },
  { id: 'filled', label: 'Filled', filled: true },
]
