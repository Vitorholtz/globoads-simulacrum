import { useRef, useEffect } from 'react'
import styles from './Checkbox.module.css'
import type { CheckboxBehavior, CheckboxType } from '../../tokens/checkbox'

export type { CheckboxBehavior, CheckboxType }

const FVAR_ICON = "'FILL' 1, 'wght' 700, 'GRAD' 0, 'opsz' 20"

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
    effectiveBehavior === 'checked' ? 'check'
    : effectiveBehavior === 'partial' ? 'remove'
    : null

  const isDisabled = disabled || forceState === 'disabled'

  // forceState (or real disabled) drives data-state — any data-state disables pointer-events in CSS
  const effectiveState = forceState ?? (disabled ? 'disabled' : undefined)

  const cls = [
    styles.checkbox,
    type === 'inverter' ? styles.inverter : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <label
      className={cls}
      data-state={effectiveState}
      data-behavior={effectiveBehavior}
    >
      <div className={styles.input}>
        <input
          ref={inputRef}
          type="checkbox"
          className={styles.nativeInput}
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={isDisabled}
        />
        {icon && (
          <span
            className={`material-symbols-rounded ${styles.icon}`}
            style={{ fontVariationSettings: FVAR_ICON }}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <div className={styles.shape} />
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
