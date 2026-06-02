import styles from './Switch.module.css'
import type { SwitchBehavior, SwitchType } from '../../tokens/switch'
import { cx } from '../../utils/cx'

export type { SwitchBehavior, SwitchType }

export interface SwitchProps {
  /** Controlled checked state */
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
  /** Conditionally displays helpText below the label */
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

  const cls = cx(styles.root, type === 'inverter' ? styles.inverter : '', className ?? '')

  return (
    <label className={cls} data-state={effectiveState} data-behavior={effectiveBehavior}>
      <div className={styles.track}>
        <input
          type="checkbox"
          className={styles.nativeInput}
          checked={effectiveBehavior === 'checked'}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={isDisabled}
        />
        <span
          className={`material-symbols-rounded icon-xs icon-filled ${styles.checkIcon}`}
          aria-hidden="true"
        >
          check
        </span>
        <div className={styles.thumb} />
      </div>

      <div className={styles.textGroup}>
        <span className={`type-body-md ${styles.label}`}>{label}</span>
        {showHelpText && helpText && (
          <span className={`type-body-xs ${styles.helpText}`}>{helpText}</span>
        )}
      </div>
    </label>
  )
}
