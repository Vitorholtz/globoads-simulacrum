import type { GuidelineDef, StateDef } from './types'

export type TextareaSize = 'sm' | 'md' | 'lg'

export interface TextareaSizeDef {
  id: TextareaSize
  label: string
  recommended?: boolean
  description: string
  fontSize: number
  lineHeight: number
  paddingY: number
  paddingX: number
}

export const TEXTAREA_SIZES: TextareaSizeDef[] = [
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

export const TEXTAREA_STATES: StateDef<string>[] = [
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
      'Campo ativo e pronto para receber entrada. Borda azul de 2px e botão de limpar disponível.',
  },
  {
    id: 'error',
    label: 'Error',
    description:
      'Valor inválido. Fundo e borda críticos com ícone de erro no canto superior direito.',
  },
  {
    id: 'readonly',
    label: 'Read Only',
    description: 'Somente leitura — valor legível e não editável, sem realce de interação.',
  },
  {
    id: 'disabled',
    label: 'Disabled',
    description: 'Campo desabilitado. Opacidade 48% e não interativo.',
  },
]

export const TEXTAREA_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Use para entradas longas',
    body: 'O Textarea é indicado quando o usuário precisa inserir textos extensos, como comentários, descrições ou observações. Para textos curtos de uma linha, prefira o TextField.',
    rule: 'Use Textarea quando o campo exigir mais de uma linha de texto.',
  },
  {
    title: 'Sempre use uma label descritiva',
    body: 'A label identifica o campo e deve ser clara e objetiva. Evite usar o placeholder como substituto da label — ele desaparece ao digitar e prejudica a acessibilidade.',
    rule: 'Nunca omita a label em formulários funcionais.',
  },
  {
    title: 'Use o contador com critério',
    body: 'O contador de caracteres orienta o usuário sobre limites de entrada. Exiba-o apenas quando há um limite máximo real e quando esse limite é relevante para o usuário.',
    rule: 'Habilite o contador somente quando houver um maxLength definido.',
  },
  {
    title: 'Valide com clareza',
    body: 'Em estado de erro, apresente uma mensagem explicativa abaixo do campo. O ícone de erro no canto reforça visualmente o problema sem substituir o texto descritivo.',
    rule: 'Sempre acompanhe o estado de erro com uma mensagem descritiva.',
  },
]

export const TEXTAREA_MATRIX_STATES: {
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

export const TEXTAREA_MATRIX_COLS: { id: string; label: string; defaultValue: string }[] = [
  { id: 'placeholder', label: 'Placeholder', defaultValue: '' },
  { id: 'filled', label: 'Filled', defaultValue: 'Text here' },
]
