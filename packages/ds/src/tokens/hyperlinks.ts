export type HyperlinkSize = 'xs' | 'sm' | 'md' | 'lg'

export type HyperlinkSizeDef = {
  id: HyperlinkSize
  label: string
  fontSize: number
  lineHeight: number
  iconSize: number
  gap: number
  description: string
  recommended?: boolean
  warning?: string
}

export const HYPERLINK_SIZES: HyperlinkSizeDef[] = [
  {
    id: 'xs',
    label: 'XS',
    fontSize: 12,
    lineHeight: 16,
    iconSize: 14,
    gap: 2,
    description:
      'Uso restrito a contextos muito densos. Fontes abaixo de 13px comprometem a leiturabilidade — prefira SM como tamanho mínimo.',
    warning: 'Tamanho abaixo do mínimo recomendado de legibilidade.',
  },
  {
    id: 'sm',
    label: 'Small',
    fontSize: 14,
    lineHeight: 20,
    iconSize: 16,
    gap: 4,
    description: 'Textos de apoio, rodapés, metadados e contextos de interface densa.',
  },
  {
    id: 'md',
    label: 'Medium',
    fontSize: 16,
    lineHeight: 24,
    iconSize: 20,
    gap: 4,
    description: 'Tamanho padrão para a maioria dos contextos de produto.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'Large',
    fontSize: 20,
    lineHeight: 32,
    iconSize: 24,
    gap: 4,
    description:
      'Textos maiores, trechos de destaque e interfaces com hierarquia visual mais ampla.',
  },
]

export const HYPERLINK_STATES = [
  { id: 'normal', label: 'Normal', description: 'Estado padrão em repouso — sem sublinhado.' },
  {
    id: 'hover',
    label: 'Hover',
    description: 'Cursor sobre o link — sublinhado visível, cor mais escura.',
  },
  {
    id: 'focus',
    label: 'Focus',
    description: 'Foco via teclado — sublinhado e anel de acessibilidade.',
  },
  { id: 'active', label: 'Active', description: 'Link pressionado — tom de azul mais escuro.' },
] as const

export const HYPERLINK_GUIDELINES = [
  {
    title: 'Texto descritivo e autoexplicativo',
    body: 'A label do hyperlink deve descrever o destino sem depender do contexto ao redor. Evite textos genéricos como "clique aqui" ou "saiba mais" — eles não comunicam o destino para leitores de tela e tecnologias assistivas.',
    rule: 'A label deve fazer sentido lida fora de contexto.',
  },
  {
    title: 'Sinalize links externos com ícone',
    body: 'Use o prop "external" para links que abrem fora da aplicação. O ícone open_in_new e o atributo target="_blank" informam ao usuário que o link abrirá em nova aba, prevenindo surpresas de navegação.',
    rule: 'Links externos sempre com ícone e target="_blank".',
  },
  {
    title: 'Tamanho mínimo de alvo de toque',
    body: 'Em interfaces touch, certifique-se de que a área de toque seja de no mínimo 44×44px. Adicione padding extra ao elemento pai ou use CSS para expandir a área clicável quando o texto for pequeno.',
    rule: 'Área de toque ≥ 44×44px em contextos touch.',
  },
  {
    title: 'Não remova o sublinhado interativo',
    body: 'O sublinhado nos estados hover, focus e active é o principal diferenciador visual de um link em relação a texto comum — especialmente para usuários com daltonismo. Nunca remova esta decoração via CSS global.',
    rule: 'Sublinhado em hover/focus/active é obrigatório.',
  },
]
