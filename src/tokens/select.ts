import type { GuidelineDef, StateDef } from './types'

export type SelectSize = 'sm' | 'md' | 'lg'

export interface SelectOption {
  value: string
  label: string
}

export interface SelectSizeDef {
  id: SelectSize
  label: string
  recommended?: boolean
  description: string
  fontSize: number
  lineHeight: number
  paddingY: number
  paddingX: number
}

export const SELECT_SIZES: SelectSizeDef[] = [
  {
    id: 'sm',
    label: 'SM',
    description: 'Para contextos compactos ou formulários com múltiplos campos curtos.',
    fontSize: 14,
    lineHeight: 20,
    paddingY: 6,
    paddingX: 8,
  },
  {
    id: 'md',
    label: 'MD',
    recommended: true,
    description: 'Tamanho padrão para a maioria dos formulários.',
    fontSize: 16,
    lineHeight: 24,
    paddingY: 8,
    paddingX: 12,
  },
  {
    id: 'lg',
    label: 'LG',
    description: 'Para campos que precisam de mais espaço visual ou proeminência.',
    fontSize: 16,
    lineHeight: 24,
    paddingY: 12,
    paddingX: 12,
  },
]

export const SELECT_STATES: StateDef<string>[] = [
  {
    id: 'normal',
    label: 'Normal',
    description: 'Estado padrão antes de qualquer interação.',
  },
  {
    id: 'hover',
    label: 'Hover',
    description: 'Usuário passou o cursor. Borda escurece para indicar interatividade.',
  },
  {
    id: 'focus',
    label: 'Focus',
    description: 'Campo focado via teclado. Borda azul de 2px indica prontidão.',
  },
  {
    id: 'active',
    label: 'Active',
    description: 'Menu aberto. Chevron aponta para cima e a lista de opções é exibida.',
  },
  {
    id: 'error',
    label: 'Error',
    description: 'Valor inválido. Fundo e borda críticos com ícone de erro.',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    description: 'Campo desabilitado. Opacidade 48% e não interativo.',
  },
]

export const SELECT_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para listas de opções fixas',
    body: 'O Select é indicado quando o usuário deve escolher entre um conjunto predefinido de opções. Evite usá-lo para listas muito longas — nesse caso, considere uma busca ou autocomplete.',
    rule: 'Use Select quando houver entre 3 e 10 opções bem definidas.',
  },
  {
    title: 'Sempre use uma label descritiva',
    body: 'A label identifica o campo e deve ser clara e objetiva. Evite usar o placeholder como substituto da label — ele desaparece ao selecionar e prejudica a acessibilidade.',
    rule: 'Nunca omita a label em formulários funcionais.',
  },
  {
    title: 'Forneça um placeholder informativo',
    body: 'O placeholder deve orientar o usuário sobre o que selecionar. Use textos como "Selecione um item" em vez de apenas "Selecionar" — ele desaparece ao selecionar e não substitui a label.',
    rule: 'O placeholder deve descrever a ação, não apenas nomear o campo.',
  },
  {
    title: 'Valide com clareza',
    body: 'Em estado de erro, apresente uma mensagem explicativa abaixo do campo. O ícone de erro no campo reforça visualmente o problema sem substituir o texto descritivo.',
    rule: 'Sempre acompanhe o estado de erro com uma mensagem descritiva.',
  },
]

export const SELECT_MATRIX_STATES: {
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

export const SELECT_MATRIX_COLS: { id: string; label: string; filled: boolean }[] = [
  { id: 'placeholder', label: 'Placeholder', filled: false },
  { id: 'filled', label: 'Filled', filled: true },
]

export const SELECT_DEMO_OPTIONS: SelectOption[] = [
  { value: 'item-1', label: 'Item 1' },
  { value: 'item-2', label: 'Item 2' },
  { value: 'item-3', label: 'Item 3' },
  { value: 'item-4', label: 'Item 4' },
]
