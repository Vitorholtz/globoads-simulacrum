import type { GuidelineDef } from './types'

export interface BadgeCounterExampleDef {
  value: string
  label: string
  description: string
}

export const BADGE_COUNTER_EXAMPLES: BadgeCounterExampleDef[] = [
  {
    value: '1',
    label: 'Valor mínimo',
    description: 'Pill no formato circular — ocupa o min-width de 16px.',
  },
  {
    value: '9',
    label: 'Dígito único',
    description: 'Ainda circular. Mantém o formato de pílula compacta.',
  },
  {
    value: '12',
    label: 'Dois dígitos',
    description: 'A pílula alarga horizontalmente para acomodar o conteúdo.',
  },
  {
    value: '99',
    label: 'Noventa e nove',
    description: 'Próximo do limite visual antes do truncamento com "+".',
  },
  {
    value: '99+',
    label: 'Cap de overflow',
    description:
      'Valor padrão quando a contagem ultrapassa 99. Use sempre este texto — nunca exiba números acima de 99.',
  },
]

export const BADGE_COUNTER_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Limite a exibição em 99+',
    body: 'Contagens acima de 99 perdem precisão visual e cognitiva. Exiba sempre "99+" como cap — o usuário entende que há muitos itens sem precisar do número exato.',
    rule: 'Regra: nunca exiba valores numéricos acima de 99 no badge.',
  },
  {
    title: 'Use exclusivamente para contagens',
    body: 'O Badge Counter é reservado para indicar quantidade de itens — notificações, mensagens não lidas, tarefas pendentes. Não use para status, categorias ou rótulos de texto.',
    rule: 'Regra: o conteúdo deve ser sempre numérico ou "99+".',
  },
  {
    title: 'Posicione próximo ao elemento de origem',
    body: 'O badge deve estar visualmente associado ao elemento que ele quantifica. Em ícones de navegação, posicione no canto superior direito. Em labels de tab, imediatamente após o texto.',
    rule: 'Regra: nunca use o badge flutuando sem âncora visual clara.',
  },
  {
    title: 'Evite badges em todos os itens simultaneamente',
    body: 'Quando todos os itens de uma lista ou barra de tabs têm badge, o sinal perde força. Reserve o badge para itens que genuinamente requerem atenção do usuário.',
    rule: 'Regra: use com parcimônia — o impacto visual depende da escassez.',
  },
]
