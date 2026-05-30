import type { GuidelineDef, BehaviorDef, VariantDef } from './types'

export type SwitchBehavior = 'unchecked' | 'checked'
export type SwitchType = 'default' | 'inverter'
export type SwitchState = 'normal' | 'hover' | 'focus' | 'active' | 'disabled'

export const SWITCH_BEHAVIORS: BehaviorDef<SwitchBehavior>[] = [
  {
    id: 'unchecked',
    label: 'Desligado',
    description: 'Estado padrão — a funcionalidade está desativada.',
  },
  {
    id: 'checked',
    label: 'Ligado',
    description:
      'A funcionalidade está ativada. O trilho muda para azul e o marcador desloca-se para a direita.',
  },
]

export const SWITCH_TYPES: VariantDef<SwitchType>[] = [
  {
    id: 'default',
    label: 'Default',
    description:
      'Switch posicionado à esquerda do rótulo. Uso padrão em formulários e configurações.',
  },
  {
    id: 'inverter',
    label: 'Inverter',
    description:
      'Switch posicionado à direita do rótulo. Adequado para listas de configuração e menus com alinhamento invertido.',
  },
]

export const SWITCH_GUIDELINES: GuidelineDef[] = [
  {
    title: 'Toggle imediato, sem confirmação',
    body: 'O switch aplica a mudança de estado imediatamente, sem botão de confirmação. Reserve-o para configurações cujo efeito é reversível e previsível. Ações destrutivas ou com impacto financeiro requerem confirmação explícita antes de aplicar.',
    rule: 'Efeito imediato → Switch. Efeito irreversível → Modal de confirmação.',
  },
  {
    title: 'Uso exclusivo para on/off',
    body: 'O switch representa estados binários de ativação: ligado ou desligado. Para selecionar múltiplos itens de uma lista use Checkbox. Para escolher uma única opção dentre várias use Radio Button.',
    rule: 'Estado único on/off → Switch. Seleção múltipla → Checkbox. Opção única → Radio.',
  },
  {
    title: 'Rótulo sempre no presente',
    body: 'O rótulo deve descrever o recurso que está sendo controlado, não o estado do switch. Prefira "Notificações por e-mail" a "Ativar notificações". Assim o rótulo permanece estável independentemente do estado.',
    rule: 'Rótulo descreve o recurso, não a ação.',
  },
  {
    title: 'Feedback de estado visível',
    body: 'A diferença entre ligado (azul) e desligado (cinza) deve ser perceptível sem depender apenas da posição do marcador. Use o Help Text para complementar quando o contexto exigir explicação adicional sobre o impacto da configuração.',
    rule: 'Cor + posição do marcador = dois sinais visuais distintos.',
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
