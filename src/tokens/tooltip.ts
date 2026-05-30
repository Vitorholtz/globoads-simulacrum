export type TooltipPosition = 'up' | 'right' | 'bottom' | 'left'
export type TooltipAlign = 'start' | 'middle' | 'end'

export interface TooltipPositionDef {
  id: TooltipPosition
  label: string
  description: string
  icon: string
}

export const TOOLTIP_POSITIONS: TooltipPositionDef[] = [
  {
    id: 'up',
    label: 'Up',
    description:
      'Tooltip aparece acima do elemento acionador. Use quando há espaço suficiente no topo e o conteúdo abaixo não deve ser ocultado.',
    icon: 'arrow_upward',
  },
  {
    id: 'right',
    label: 'Right',
    description:
      'Tooltip aparece à direita do elemento. Ideal para ícones em barras laterais ou listas verticais.',
    icon: 'arrow_forward',
  },
  {
    id: 'bottom',
    label: 'Bottom',
    description:
      'Tooltip aparece abaixo do elemento. Útil quando o espaço acima é limitado ou quando o elemento está próximo ao topo da tela.',
    icon: 'arrow_downward',
  },
  {
    id: 'left',
    label: 'Left',
    description:
      'Tooltip aparece à esquerda do elemento. Use quando a interface está posicionada à direita e há espaço à esquerda.',
    icon: 'arrow_back',
  },
]

import { GuidelineDef, VariantDef } from './types'

export const TOOLTIP_ALIGNMENTS: VariantDef<TooltipAlign>[] = [
  {
    id: 'start',
    label: 'Start',
    description:
      'Seta posicionada no início do tooltip — esquerda (posições cima/baixo) ou topo (posições esquerda/direita).',
  },
  {
    id: 'middle',
    label: 'Middle',
    description:
      'Seta centralizada no tooltip. Usar quando o acionador está centralizado em relação ao conteúdo ao redor.',
  },
  {
    id: 'end',
    label: 'End',
    description:
      'Seta posicionada no final do tooltip — direita (posições cima/baixo) ou base (posições esquerda/direita).',
  },
]

export const TOOLTIP_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Texto conciso',
    body: 'O conteúdo do Tooltip deve ser curto — no máximo uma frase com até 10 palavras. Tooltips não são o lugar adequado para instruções longas ou conteúdo formatado.',
    rule: 'Evite parágrafos. Se o conteúdo for extenso, use um Popover ou modal.',
  },
  {
    title: 'Informação complementar, não obrigatória',
    body: 'Tooltips revelam informações que enriquecem a experiência, mas não são essenciais para o fluxo principal. Nunca coloque dentro de um Tooltip informação que o usuário precisa ler para completar uma ação.',
    rule: 'Se o dado for crítico, ele deve estar visível diretamente na interface, não oculto em um hover.',
  },
  {
    title: 'Posicionamento inteligente',
    body: 'Escolha a posição e o alinhamento que evitem que o Tooltip seja cortado pela borda da viewport ou sobreponha conteúdo relevante. Prefira "up" na maioria dos casos; use "bottom" próximo ao topo da tela.',
    rule: 'Sempre verifique se o Tooltip aparece completamente visível em telas menores.',
  },
  {
    title: 'Acessibilidade por foco',
    body: 'O Tooltip deve ser acessível por teclado — ao focar no elemento acionador via Tab, o Tooltip aparece. Isso garante que usuários que navegam sem mouse tenham acesso à mesma informação.',
    rule: 'Sempre associe o Tooltip ao elemento via aria-describedby ou role="tooltip" para leitores de tela.',
  },
]
