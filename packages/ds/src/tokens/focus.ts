export type FocusToken = {
  name: string
  variable: string
  cssValue: string
  useCase: string
  description: string
}

export const FOCUS_TOKENS: FocusToken[] = [
  {
    name: 'Outline/Focus',
    variable: '--outline-focus',
    cssValue: '0 0 0 2px var(--color-surface-primary), 0 0 0 4px var(--color-focus-default)',
    useCase: 'Componentes interativos',
    description:
      'Duplo anel com gap branco. Usado em botões, chips, cards interativos, tabs, breadcrumb e outros elementos focáveis que não possuem borda própria.',
  },
  {
    name: 'Outline/Focus/Out',
    variable: '--outline-focus-out',
    cssValue: '0 0 0 2px var(--color-focus-default)',
    useCase: 'Inputs com borda',
    description:
      'Anel simples sem gap. Reforça a borda existente do componente. Usado em TextField, Textarea, Select, Combobox e DatePicker.',
  },
]
