import { GuidelineDef, StateDef } from './types'

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
    id: 'disabled',
    label: 'Disabled',
    description: 'Campo desabilitado. Opacidade 48% e não interativo.',
  },
]

export const COMBOBOX_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para entradas múltiplas livres',
    body: 'O Combobox é ideal quando o usuário precisa inserir vários valores de texto livre, como tags, palavras-chave ou e-mails. Cada valor digitado vira um chip ao pressionar Enter.',
    rule: 'Use Combobox quando o usuário precisar adicionar múltiplos itens individualmente.',
  },
  {
    title: 'Enter confirma o item',
    body: 'O usuário digita o valor no campo e pressiona Enter para transformá-lo em um chip. Isso deixa o campo livre para uma próxima entrada sem que o usuário precise clicar em outro elemento.',
    rule: 'Informe no placeholder ou help text que Enter adiciona o item.',
  },
  {
    title: 'Chips indicam entradas confirmadas',
    body: 'Cada valor confirmado é representado por um chip abaixo do campo. O usuário pode remover entradas individualmente clicando no ícone de fechar do chip, ou usar Backspace com o campo vazio.',
    rule: 'Sempre exiba chips para tornar as entradas visíveis e removíveis.',
  },
  {
    title: 'Valide com clareza',
    body: 'Em estado de erro, apresente uma mensagem explicativa abaixo do campo. O ícone de erro no campo reforça visualmente o problema sem substituir o texto descritivo.',
    rule: 'Sempre acompanhe o estado de erro com uma mensagem descritiva.',
  },
]
