import { useRef, useEffect } from 'react'
import styles from './Checkbox.module.css'
import type { CheckboxBehavior, CheckboxType } from '../../tokens/checkbox'
import { cx } from '../../utils/cx'

export type { CheckboxBehavior, CheckboxType }

export interface CheckboxProps {
  /** Controlled checked state */
  checked?: boolean
  /** Indeterminate / partial visual (overrides checked) */
  indeterminate?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  /** Forces a specific visual behavior — docs/matrix only, disables interaction */
  behavior?: CheckboxBehavior
  /** Forces a specific visual state — docs/matrix only, disables interaction */
  forceState?: 'hover' | 'focus' | 'active' | 'disabled'
  type?: CheckboxType
  label?: string
  helpText?: string
  showHelpText?: boolean
  className?: string
}

export default function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  behavior,
  forceState,
  type = 'default',
  label = 'Checkbox',
  helpText,
  showHelpText = false,
  className,
}: CheckboxProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  // behavior prop (docs mode) takes precedence over derived behavior
  const effectiveBehavior: CheckboxBehavior =
    behavior ?? (indeterminate ? 'partial' : checked ? 'checked' : 'unchecked')

  const icon =
    effectiveBehavior === 'checked' ? 'check' : effectiveBehavior === 'partial' ? 'remove' : null

  const isDisabled = disabled || forceState === 'disabled'

  // forceState (or real disabled) drives data-state — any data-state disables pointer-events in CSS
  const effectiveState = forceState ?? (disabled ? 'disabled' : undefined)

  const cls = cx(styles.root, type === 'inverter' ? styles.inverter : '', className ?? '')

  return (
    <label className={cls} data-state={effectiveState} data-behavior={effectiveBehavior}>
      <div className={styles.input}>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.nativeInput}
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          disabled={isDisabled}
        />
        {icon && (
          <span
            className={`material-symbols-rounded icon-xs icon-filled ${styles.icon}`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
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
