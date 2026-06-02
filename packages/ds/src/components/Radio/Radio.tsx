import styles from './Radio.module.css'
import type { RadioBehavior, RadioType } from '../../tokens/radio'
import { cx } from '../../utils/cx'

export type { RadioBehavior, RadioType }

export interface RadioProps {
  /** Controlled checked state */
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  /** Forces a specific visual behavior — docs/matrix only, disables interaction */
  behavior?: RadioBehavior
  /** Forces a specific visual state — docs/matrix only, disables interaction */
  forceState?: 'hover' | 'focus' | 'active' | 'disabled'
  type?: RadioType
  label?: string
  helpText?: string
  /** Conditionally displays helpText below the label */
  showHelpText?: boolean
  /** Radio group name for native mutual exclusion */
  name?: string
  value?: string
  className?: string
}

export default function Radio({
  checked = false,
  onChange,
  disabled = false,
  behavior,
  forceState,
  type = 'default',
  label = 'Radio',
  helpText,
  showHelpText = false,
  name,
  value,
  className,
}: RadioProps) {
  const effectiveBehavior: RadioBehavior = behavior ?? (checked ? 'checked' : 'unchecked')

  const isDisabled = disabled || forceState === 'disabled'
  const effectiveState = forceState ?? (disabled ? 'disabled' : undefined)

  const cls = cx(styles.root, type === 'inverter' ? styles.inverter : '', className ?? '')

  return (
    <label className={cls} data-state={effectiveState} data-behavior={effectiveBehavior}>
      <div className={styles.input}>
        <input
          type="radio"
          className={styles.nativeInput}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={isDisabled}
          name={name}
          value={value}
        />
        <div className={styles.shape} />
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
