export type RadioBehavior = 'unchecked' | 'checked'
export type RadioType = 'default' | 'inverter'

export type RadioBehaviorDef = {
  id: RadioBehavior
  label: string
  description: string
}

export type RadioTypeDef = {
  id: RadioType
  label: string
  description: string
}

export type RadioGuidelineDef = {
  title: string
  body: string
  rule: string
}

export const RADIO_BEHAVIORS: RadioBehaviorDef[] = [
  {
    id: 'unchecked',
    label: 'Unchecked',
    description: 'Estado padrão. Nenhuma opção foi selecionada pelo usuário.',
  },
  {
    id: 'checked',
    label: 'Checked',
    description: 'A opção foi selecionada. Apenas um radio button do grupo pode estar neste estado.',
  },
]

export const RADIO_TYPES: RadioTypeDef[] = [
  {
    id: 'default',
    label: 'Default',
    description: 'Posicionamento padrão: controle à esquerda do rótulo.',
  },
  {
    id: 'inverter',
    label: 'Inverter',
    description: 'Posicionamento invertido: controle à direita do rótulo.',
  },
]

export const RADIO_GUIDELINES: RadioGuidelineDef[] = [
  {
    title: 'Use em grupos',
    body: 'Radio buttons devem ser usados em grupos de dois ou mais opções mutuamente exclusivas. Nunca use um radio button isolado — para seleção única binária, prefira o Checkbox ou Toggle.',
    rule: 'Mínimo de 2 opções por grupo',
  },
  {
    title: 'Rótulos claros e concisos',
    body: 'Cada opção deve ter um rótulo descritivo e objetivo. Evite rótulos genéricos como "Sim" e "Não" sem contexto suficiente para o usuário tomar uma decisão informada.',
    rule: 'Rótulo obrigatório em toda opção',
  },
  {
    title: 'Pré-selecione com critério',
    body: 'Pré-selecione a opção mais comum ou segura quando houver uma padrão óbvia. Não pré-selecione quando todas as opções tiverem peso igual ou quando a escolha do usuário for imprevisível.',
    rule: 'Pré-seleção deve refletir a opção mais provável',
  },
  {
    title: 'Ordem das opções',
    body: 'Organize as opções em ordem lógica: alfabética, numérica, por frequência de uso ou de maior para menor impacto. Evite ordem arbitrária que force o usuário a ler todas as opções antes de decidir.',
    rule: 'Ordem previsível e justificável',
  },
]

export const MATRIX_STATES: { id: string; label: string; force: 'hover' | 'focus' | 'active' | 'disabled' | undefined }[] = [
  { id: 'normal',   label: 'Normal',   force: undefined },
  { id: 'hover',    label: 'Hover',    force: 'hover' },
  { id: 'focus',    label: 'Focus',    force: 'focus' },
  { id: 'active',   label: 'Active',   force: 'active' },
  { id: 'disabled', label: 'Disabled', force: 'disabled' },
]
