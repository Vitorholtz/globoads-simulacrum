import styles from './ChipFilter.module.css'
import type { ChipFilterBehavior } from '../../tokens/chipFilter'

export type { ChipFilterBehavior }

export interface ChipFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  behavior?: ChipFilterBehavior
  dropdown?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
}

export default function ChipFilter({
  label = 'Chip',
  behavior = 'unchecked',
  dropdown = true,
  forceState,
  disabled,
  className,
  ...rest
}: ChipFilterProps) {
  const isChecked = behavior === 'checked'
  const isDisabled = disabled || forceState === 'disabled'

  const cls = [
    styles.chip,
    isChecked ? styles.checked : styles.unchecked,
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      disabled={isDisabled}
      data-state={forceState}
      {...rest}
    >
      {isChecked && (
        <span
          className={`material-symbols-rounded icon-sm ${styles.icon}`}
          aria-hidden="true"
        >
          check
        </span>
      )}
      <span className={`type-caption-md ${styles.label}`}>{label}</span>
      {dropdown && (
        <span
          className={`material-symbols-rounded icon-sm ${styles.dropdownIcon}`}
          aria-hidden="true"
        >
          arrow_drop_down
        </span>
      )}
    </button>
  )
}
