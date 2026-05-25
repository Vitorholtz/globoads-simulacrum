import styles from './ChipAssist.module.css'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'

export interface ChipAssistProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string
  /** Material Symbol icon name (required — defining feature of this chip type) */
  icon?: string
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
}

const ICON_STYLE = { fontVariationSettings: FVAR_OUTLINED_SM }

export default function ChipAssist({
  label = 'Chip',
  icon = 'calendar_today',
  forceState,
  disabled,
  className,
  ...rest
}: ChipAssistProps) {
  const isDisabled = disabled || forceState === 'disabled'

  const cls = [styles.chip, className ?? ''].filter(Boolean).join(' ')

  return (
    <button
      className={cls}
      disabled={isDisabled}
      data-state={forceState}
      {...rest}
    >
      <span
        className={`material-symbols-rounded ${styles.icon}`}
        style={ICON_STYLE}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className={styles.label}>{label}</span>
    </button>
  )
}
