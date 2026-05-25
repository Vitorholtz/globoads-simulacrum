export type ChipBehavior = 'unchecked' | 'checked'
export type ChipState = 'normal' | 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'

export type ChipBehaviorDef = {
  id: ChipBehavior
  label: string
  description: string
}

export type ChipStateDef = {
  id: ChipState
  label: string
  description: string
  force?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
}

export type ChipGuidelineDef = {
  title: string
  body: string
  rule: string
}

export const CHIP_BEHAVIORS: ChipBehaviorDef[] = [
  {
    id: 'unchecked',
    label: 'Unchecked',
    description: 'Estado neutro — sugestão ainda não selecionada. Fundo branco com borda primária.',
  },
  {
    id: 'checked',
    label: 'Checked',
    description: 'Sugestão selecionada — destaque em azul indica que o filtro ou resposta está ativo.',
  },
]

export const CHIP_STATES: ChipStateDef[] = [
  { id: 'normal',   label: 'Normal',   description: 'Estado padrão em repouso.',                             force: undefined },
  { id: 'hover',    label: 'Hover',    description: 'Cursor sobre o chip.',                                   force: 'hover' },
  { id: 'focus',    label: 'Focus',    description: 'Foco via teclado — anel de acessibilidade.',             force: 'focus' },
  { id: 'active',   label: 'Active',   description: 'Chip pressionado.',                                      force: 'active' },
  { id: 'dragged',  label: 'Dragged',  description: 'Chip em arrastar-e-soltar — sombra indica elevação.',    force: 'dragged' },
  { id: 'disabled', label: 'Disabled', description: 'Indisponível — opacidade 48%.',                          force: 'disabled' },
]

export const CHIP_GUIDELINES: ChipGuidelineDef[] = [
  {
    title: 'Sugestões dinâmicas',
    body: 'Os chips de sugestão devem ser gerados dinamicamente com base no contexto da entrada do usuário. Evite listas estáticas — o valor está na personalização em tempo real das opções apresentadas.',
    rule: 'Chips gerados pelo contexto, não por listas fixas.',
  },
  {
    title: 'Quantidade de chips',
    body: 'Exiba no máximo 5 a 7 sugestões por vez. Uma quantidade excessiva cria sobrecarga cognitiva e anula o benefício de direcionar a intenção do usuário para opções relevantes.',
    rule: 'Máximo de 5 a 7 chips visíveis por vez.',
  },
  {
    title: 'Seleção acumulativa',
    body: 'Múltiplos chips podem ser selecionados simultaneamente para refinar resultados. O estado Checked deve permanecer visível para que o usuário saiba quais filtros ou respostas estão ativos.',
    rule: 'Seleção múltipla é permitida — mostre os ativos claramente.',
  },
  {
    title: 'Rótulo conciso',
    body: 'O rótulo do chip deve ter no máximo 2 a 3 palavras. Sugestões longas perdem eficácia — o usuário precisa identificar e decidir rapidamente ao escanear as opções disponíveis.',
    rule: 'Rótulo com até 3 palavras.',
  },
]
