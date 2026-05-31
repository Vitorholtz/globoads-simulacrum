export type DurationToken = {
  name: string
  variable: string
  valueMs: number
  description: string
}

export type EasingToken = {
  name: string
  variable: string
  value: string
  description: string
}

export const MOTION_DURATION_TOKENS: DurationToken[] = [
  {
    name: 'Fast',
    variable: '--motion-duration-fast',
    valueMs: 100,
    description: 'Feedback sutil. Hover em tabs, hyperlinks e células de calendário.',
  },
  {
    name: 'Base',
    variable: '--motion-duration-base',
    valueMs: 120,
    description: 'Padrão de interação. Hover, focus e active na maioria dos componentes.',
  },
  {
    name: 'Slow',
    variable: '--motion-duration-slow',
    valueMs: 200,
    description: 'Mudanças estruturais. Accordion, chevron, overlays e entradas de painel.',
  },
]

export const MOTION_EASING_TOKENS: EasingToken[] = [
  {
    name: 'Default',
    variable: '--motion-easing-default',
    value: 'ease',
    description: 'Curva padrão. Usada na maioria das transições de estado.',
  },
  {
    name: 'Out',
    variable: '--motion-easing-out',
    value: 'ease-out',
    description: 'Desacelera ao fim. Entrada de popovers e painéis.',
  },
  {
    name: 'In-Out',
    variable: '--motion-easing-in-out',
    value: 'ease-in-out',
    description: 'Suave nas extremidades. Animações de loop (shimmer, loader).',
  },
  {
    name: 'Linear',
    variable: '--motion-easing-linear',
    value: 'linear',
    description: 'Velocidade constante. Rotação contínua de spinners.',
  },
]
