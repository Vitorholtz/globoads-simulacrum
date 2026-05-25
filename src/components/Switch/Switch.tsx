import styles from './Switch.module.css'
import type { SwitchBehavior, SwitchType } from '../../tokens/switch'

export type { SwitchBehavior, SwitchType }

const FVAR_CHECK = "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 20"

export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  /** Forces a visual behavior — docs/matrix only */
  behavior?: SwitchBehavior
  /** Forces a visual state — docs/matrix only, disables interaction */
  forceState?: 'hover' | 'focus' | 'active' | 'disabled'
  type?: SwitchType
  label?: string
  helpText?: string
  showHelpText?: boolean
  className?: string
}

export default function Switch({
  checked = false,
  onChange,
  disabled = false,
  behavior,
  forceState,
  type = 'default',
  label = 'Switch',
  helpText,
  showHelpText = false,
  className,
}: SwitchProps) {
  const effectiveBehavior: SwitchBehavior = behavior ?? (checked ? 'checked' : 'unchecked')
  const isDisabled = disabled || forceState === 'disabled'
  const effectiveState = forceState ?? (disabled ? 'disabled' : undefined)

  const cls = [
    styles.switch,
    type === 'inverter' ? styles.inverter : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <label
      className={cls}
      data-state={effectiveState}
      data-behavior={effectiveBehavior}
    >
      <div className={styles.track}>
        <input
          type="checkbox"
          className={styles.nativeInput}
          checked={effectiveBehavior === 'checked'}
          onChange={e => onChange?.(e.target.checked)}
          disabled={isDisabled}
        />
        <span
          className={`material-symbols-rounded ${styles.checkIcon}`}
          style={{ fontVariationSettings: FVAR_CHECK }}
          aria-hidden="true"
        >
          check
        </span>
        <div className={styles.thumb} />
      </div>

      <div className={styles.textGroup}>
        <span className={styles.label}>{label}</span>
        {showHelpText && helpText && (
          <span className={styles.helpText}>{helpText}</span>
        )}
      </div>
    </label>
  )
}
