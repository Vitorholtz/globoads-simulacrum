import type { GuidelineDef, BehaviorDef, StateDef, VariantDef } from './types'

export type CheckboxBehavior = 'unchecked' | 'partial' | 'checked'
export type CheckboxType = 'default' | 'inverter'
export type CheckboxState = 'normal' | 'hover' | 'focus' | 'active' | 'disabled'

export const CHECKBOX_BEHAVIORS: BehaviorDef<CheckboxBehavior>[] = [
  {
    id: 'unchecked',
    label: 'Unchecked',
    description: 'Estado padrão — nenhum item selecionado.',
  },
  {
    id: 'partial',
    label: 'Partial',
    icon: 'remove',
    description:
      'Seleção parcial de itens em uma lista — estado indeterminado. Indica que alguns, mas não todos, os filhos estão selecionados.',
  },
  {
    id: 'checked',
    label: 'Checked',
    icon: 'check',
    description: 'Todos os itens selecionados ou opção ativada.',
  },
]

export const CHECKBOX_STATES: StateDef<Exclude<CheckboxState, 'normal'>>[] = [
  { id: 'hover', label: 'Hover', description: 'Cursor sobre o elemento.' },
  { id: 'focus', label: 'Focus', description: 'Foco via teclado — anel de acessibilidade duplo.' },
  { id: 'active', label: 'Active', description: 'Checkbox pressionado.' },
  { id: 'disabled', label: 'Disabled', description: 'Indisponível — opacidade 48%.' },
]

export const CHECKBOX_TYPES: VariantDef<CheckboxType>[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Checkbox posicionado à esquerda do rótulo. Uso padrão em formulários e listas.',
  },
  {
    id: 'inverter',
    label: 'Inverter',
    description:
      'Checkbox posicionado à direita do rótulo. Adequado para listas com alinhamento invertido ou menus laterais.',
  },
]

export const CHECKBOX_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Seleção múltipla vs. toggle',
    body: 'Use checkbox para selecionar um ou mais itens de uma lista. Para ativar ou desativar uma única configuração de forma binária, prefira o componente Toggle Switch — semanticamente mais preciso para esse contexto.',
    rule: 'Lista com múltiplos itens → Checkbox. Estado único on/off → Toggle.',
  },
  {
    title: 'Estado indeterminado (Partial)',
    body: 'Use o estado Partial quando um grupo pai contém filhos tanto marcados quanto desmarcados. Clicar em um Partial deve selecionar todos os itens do grupo. Nunca use Partial como estado inicial de um formulário.',
    rule: 'Partial indica seleção mista — nunca use como estado inicial.',
  },
  {
    title: 'Rótulo sempre presente',
    body: 'Todo checkbox deve ter um rótulo visível que descreva claramente o que está sendo selecionado. Em contextos onde o rótulo não pode ser exibido visualmente, forneça um aria-label equivalente para leitores de tela.',
    rule: 'Sem rótulo visível → adicione aria-label.',
  },
  {
    title: 'Área de toque mínima',
    body: 'A área clicável do checkbox deve ter no mínimo 40×40px em contextos touch. O componente inclui padding vertical de 4px — complemente com espaçamento extra na grade de layout quando necessário.',
    rule: 'Área de toque ≥ 40×40px.',
  },
]

export const MATRIX_STATES: {
  id: string
  label: string
  force: 'hover' | 'focus' | 'active' | 'disabled' | undefined
}[] = [
  { id: 'normal', label: 'Normal', force: undefined },
  { id: 'hover', label: 'Hover', force: 'hover' },
  { id: 'focus', label: 'Focus', force: 'focus' },
  { id: 'active', label: 'Active', force: 'active' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]
