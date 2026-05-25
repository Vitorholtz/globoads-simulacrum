import styles from './ChipFilter.module.css'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'
import type { ChipFilterBehavior } from '../../tokens/chipFilter'

export type { ChipFilterBehavior }

export interface ChipFilterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  behavior?: ChipFilterBehavior
  dropdown?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
}

const ICON_STYLE = { fontVariationSettings: FVAR_OUTLINED_SM }

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
          className={`material-symbols-rounded ${styles.icon}`}
          style={ICON_STYLE}
          aria-hidden="true"
        >
          check
        </span>
      )}
      <span className={styles.label}>{label}</span>
      {dropdown && (
        <span
          className={`material-symbols-rounded ${styles.dropdownIcon}`}
          style={ICON_STYLE}
          aria-hidden="true"
        >
          arrow_drop_down
        </span>
      )}
    </button>
  )
}
