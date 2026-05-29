import styles from './ChipSuggestion.module.css'
import type { ChipBehavior } from '../../tokens/chipSuggestion'

export type { ChipBehavior }

export interface ChipSuggestionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  behavior?: ChipBehavior
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
}

export default function ChipSuggestion({
  label = 'Chip',
  behavior = 'unchecked',
  forceState,
  disabled,
  className,
  ...rest
}: ChipSuggestionProps) {
  const isDisabled = disabled || forceState === 'disabled'

  const cls = [
    styles.chip,
    behavior === 'checked' ? styles.checked : styles.unchecked,
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      disabled={isDisabled}
      data-state={forceState}
      {...rest}
    >
      <span className={`type-caption-md ${styles.label}`}>{label}</span>
    </button>
  )
}
