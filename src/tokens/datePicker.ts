export type DatePickerSize = 'sm' | 'md' | 'lg'
export type CalendarSize = 'sm' | 'md'

export type DatePickerSizeDef = {
  id: DatePickerSize
  label: string
  paddingY: number
  paddingX: number
  fontSize: number
  iconSize: number
  description: string
  recommended?: boolean
}

export type CalendarSizeDef = {
  id: CalendarSize
  label: string
  width: number
  description: string
  recommended?: boolean
}

export const DATE_PICKER_SIZES: DatePickerSizeDef[] = [
  {
    id: 'sm',
    label: 'Small',
    paddingY: 6,
    paddingX: 8,
    fontSize: 14,
    iconSize: 16,
    description: 'Tabelas densas, filtros compactos, formulários com muitos campos.',
  },
  {
    id: 'md',
    label: 'Medium',
    paddingY: 8,
    paddingX: 12,
    fontSize: 16,
    iconSize: 20,
    description: 'Tamanho padrão para a maioria dos formulários e campos de data.',
    recommended: true,
  },
  {
    id: 'lg',
    label: 'Large',
    paddingY: 12,
    paddingX: 12,
    fontSize: 16,
    iconSize: 24,
    description: 'Destaque visual em formulários de cadastro, landing pages e onboarding.',
  },
]

export const DATE_PICKER_STATES = [
  { id: 'normal',   label: 'Normal',   description: 'Estado padrão em repouso.' },
  { id: 'hover',    label: 'Hover',    description: 'Cursor sobre o campo — borda escurece.' },
  { id: 'focus',    label: 'Focus',    description: 'Campo ativo com foco — borda azul 2px.' },
  { id: 'active',   label: 'Active',   description: 'Calendário aberto com seleção visível.' },
  { id: 'error',    label: 'Error',    description: 'Data inválida — borda e fundo crítico.' },
  { id: 'disabled', label: 'Disabled', description: 'Campo indisponível — opacidade 48%.' },
] as const

export const CALENDAR_SIZES: CalendarSizeDef[] = [
  {
    id: 'sm',
    label: 'Small',
    width: 270,
    description: 'Compacto para espaços reduzidos, sidebars e menus sobrepostos.',
  },
  {
    id: 'md',
    label: 'Medium',
    width: 400,
    description: 'Tamanho padrão com maior área de toque, ideal para formulários e modais.',
    recommended: true,
  },
]

export const DATE_PICKER_GUIDELINES = [
  {
    title: 'Formato de data consistente',
    body: 'Use sempre o formato DD/MM/AAAA para datas no Brasil. O placeholder deve refletir esse formato para orientar o preenchimento manual sem depender do calendário.',
    rule: 'DD/MM/AAAA — padrão brasileiro obrigatório.',
  },
  {
    title: 'Calendário como atalho, não obrigação',
    body: 'O usuário deve poder preencher a data manualmente ou selecioná-la pelo calendário. Nunca bloqueie a digitação direta — isso é essencial para acessibilidade e velocidade.',
    rule: 'Digitação manual e calendário são caminhos equivalentes.',
  },
  {
    title: 'Feedback de erro no blur',
    body: 'Valide a data ao sair do campo (blur), não durante a digitação. O estado de erro mostra fundo rosado, borda crítica e texto explicativo abaixo do campo.',
    rule: 'Valide no blur — nunca enquanto o usuário digita.',
  },
  {
    title: 'Campo opcional explícito',
    body: 'Marque campos de data opcionais com a tag "Opcional". Em formulários onde todos os campos são opcionais, omita a marcação para reduzir ruído visual.',
    rule: 'Marque o opcional, não o obrigatório.',
  },
]
