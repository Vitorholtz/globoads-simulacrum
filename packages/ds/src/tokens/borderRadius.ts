export type BorderRadiusToken = {
  name: string
  variable: string
  valuePx: number
  valueRem: string
  description: string
}

export const BORDER_RADIUS_TOKENS: BorderRadiusToken[] = [
  {
    name: 'Border Radius None',
    variable: '--border-radius-none',
    valuePx: 0,
    valueRem: '0rem',
    description:
      'Sem arredondamento. Utilizado em elementos que exigem cantos vivos, como separadores e bordas de tabela.',
  },
  {
    name: 'Border Radius XS',
    variable: '--border-radius-xs',
    valuePx: 2,
    valueRem: '0.125rem',
    description:
      'Arredondamento mínimo. Indicado para elementos muito pequenos como badges e chips compactos.',
  },
  {
    name: 'Border Radius SM',
    variable: '--border-radius-sm',
    valuePx: 4,
    valueRem: '0.25rem',
    description:
      'Arredondamento pequeno. Padrão para checkboxes, inputs e componentes de formulário.',
  },
  {
    name: 'Border Radius MD',
    variable: '--border-radius-md',
    valuePx: 8,
    valueRem: '0.5rem',
    description: 'Arredondamento médio. Utilizado em cards, menus suspensos e painéis de conteúdo.',
  },
  {
    name: 'Border Radius LG',
    variable: '--border-radius-lg',
    valuePx: 12,
    valueRem: '0.75rem',
    description: 'Arredondamento grande. Indicado para containers de destaque e modais.',
  },
  {
    name: 'Border Radius XL',
    variable: '--border-radius-xl',
    valuePx: 16,
    valueRem: '1rem',
    description: 'Arredondamento extra grande. Aplicado em superfícies de maior destaque visual.',
  },
  {
    name: 'Border Radius 2XL',
    variable: '--border-radius-2xl',
    valuePx: 20,
    valueRem: '1.25rem',
    description: 'Arredondamento 2XL. Para elementos com silhueta suave e destaque de marca.',
  },
  {
    name: 'Border Radius 3XL',
    variable: '--border-radius-3xl',
    valuePx: 24,
    valueRem: '1.5rem',
    description: 'Arredondamento 3XL. Utilizado em ilustrações e componentes de hero.',
  },
  {
    name: 'Border Radius 4XL',
    variable: '--border-radius-4xl',
    valuePx: 32,
    valueRem: '2rem',
    description:
      'Arredondamento 4XL. Reservado para elementos de grande escala com cantos muito suaves.',
  },
  {
    name: 'Border Radius Full',
    variable: '--border-radius-full',
    valuePx: 999,
    valueRem: '62.4375rem',
    description:
      'Arredondamento completo. Cria formas de pílula ou círculo. Utilizado em botões pill, avatares e tags arredondadas.',
  },
]
