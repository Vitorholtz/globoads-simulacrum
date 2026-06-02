export type BorderWidthToken = {
  name: string
  variable: string
  valuePx: number
  valueRem: string
  description: string
}

export const BORDER_WIDTH_TOKENS: BorderWidthToken[] = [
  {
    name: 'Border Width None',
    variable: '--border-width-none',
    valuePx: 0,
    valueRem: '0rem',
    description: 'Valor nulo. Usado para remover bordas herdadas de um elemento.',
  },
  {
    name: 'Border Width SM',
    variable: '--border-width-sm',
    valuePx: 1,
    valueRem: '0.063rem',
    description: 'Borda padrão. Usada em componentes, inputs e separadores de interface.',
  },
  {
    name: 'Border Width MD',
    variable: '--border-width-md',
    valuePx: 2,
    valueRem: '0.125rem',
    description: 'Borda de ênfase. Indica foco, seleção e estados ativos de componentes.',
  },
  {
    name: 'Border Width LG',
    variable: '--border-width-lg',
    valuePx: 4,
    valueRem: '0.25rem',
    description: 'Borda destacada. Usada em indicadores visuais e alertas de alto contraste.',
  },
  {
    name: 'Border Width XL',
    variable: '--border-width-xl',
    valuePx: 6,
    valueRem: '0.375rem',
    description: 'Borda expressiva. Separação estrutural de alta visibilidade entre blocos.',
  },
  {
    name: 'Border Width 2XL',
    variable: '--border-width-2xl',
    valuePx: 8,
    valueRem: '0.5rem',
    description: 'Borda máxima. Reservada para elementos de altíssima ênfase visual.',
  },
]
