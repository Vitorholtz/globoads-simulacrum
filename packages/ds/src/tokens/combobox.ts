import type { GuidelineDef, StateDef } from './types'

export type ComboboxSize = 'sm' | 'md' | 'lg'

export interface ComboboxSizeDef {
  id: ComboboxSize
  label: string
  recommended?: boolean
  description: string
  fontSize: number
  lineHeight: number
  paddingY: number
  paddingX: number
}

export const COMBOBOX_SIZES: ComboboxSizeDef[] = [
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

export const COMBOBOX_STATES: StateDef<string>[] = [
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
    description:
      'Campo focado via teclado ou clique. Borda azul de 2px indica prontidão para digitação.',
  },
  {
    id: 'error',
    label: 'Error',
    description: 'Entrada inválida. Fundo e borda críticos com ícone de erro no campo.',
  },
  {
    id: 'readonly',
    label: 'Read Only',
    description: 'Somente leitura — valores legíveis e não editáveis, sem realce de interação.',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    description: 'Campo desabilitado. Opacidade 48% e não interativo.',
  },
]

export const COMBOBOX_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para entradas múltiplas livres',
    body: 'O Combobox é ideal quando o usuário precisa inserir vários valores de texto livre, como tags, palavras-chave ou e-mails. Cada valor digitado vira um chip ao pressionar Enter.',
  },
  {
    title: 'Enter confirma o item',
    body: 'O usuário digita o valor no campo e pressiona Enter para transformá-lo em um chip. Isso deixa o campo livre para uma próxima entrada sem que o usuário precise clicar em outro elemento.',
  },
  {
    title: 'Chips indicam entradas confirmadas',
    body: 'Cada valor confirmado é representado por um chip abaixo do campo. O usuário pode remover entradas individualmente clicando no ícone de fechar do chip, ou usar Backspace com o campo vazio.',
  },
  {
    title: 'Valide com clareza',
    body: 'Em estado de erro, apresente uma mensagem explicativa abaixo do campo. O ícone de erro no campo reforça visualmente o problema sem substituir o texto descritivo.',
  },
]

export const COMBOBOX_MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'error' | 'disabled' | 'readonly' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'error', label: 'Error', force: 'error' },
  { id: 'readonly', label: 'Read Only', force: 'readonly' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]

export const COMBOBOX_MATRIX_COLS: { id: string; label: string; filled: boolean }[] = [
  { id: 'placeholder', label: 'Placeholder', filled: false },
  { id: 'filled', label: 'Filled', filled: true },
]
