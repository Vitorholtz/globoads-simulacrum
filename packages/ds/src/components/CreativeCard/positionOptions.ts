import type { SelectOption } from '../Select/Select'

/** Opções padrão do campo "Posição" do CreativeCard — fonte única, sobrescrevível via prop. */
export const DEFAULT_POSITION_OPTIONS: SelectOption[] = [
  { value: 'primeira', label: 'Primeira posição' },
  { value: 'segunda', label: 'Segunda posição' },
  { value: 'terceira', label: 'Terceira posição' },
  { value: 'quarta', label: 'Quarta posição' },
]
