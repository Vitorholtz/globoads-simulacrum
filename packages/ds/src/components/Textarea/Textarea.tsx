import { useState, useId } from 'react'
import styles from './Textarea.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { TextareaSize } from '../../tokens/textarea'

export type { TextareaSize }

export interface TextareaProps {
  size?: TextareaSize
  label?: string
  /** Hides the label visually; it remains in the DOM for screen readers */
  showLabel?: boolean
  /** Appends "(opcional)" to the label */
  optional?: boolean
  /** Tooltip text shown on the info icon beside the label */
  descriptionText?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  maxLength?: number
  /** Shows a "N caracteres restantes" counter below the textarea; requires maxLength */
  showCounter?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'error' | 'disabled' | 'readonly'
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>
  className?: string
}

const TEXTAREA_TYPE: Record<TextareaSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

const ICON_CLS: Record<TextareaSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-md',
}

export default function Textarea({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  descriptionText,
  placeholder = 'Text here',
  helpText,
  errorMessage,
  maxLength,
  showCounter = false,
  forceState,
  id,
  name,
  value,
  defaultValue,
  disabled,
  readOnly,
  onChange,
  className,
}: TextareaProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const isReadOnly = !isDisabled && (readOnly || forceState === 'readonly')
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const showClear =
    currentValue !== '' && !isReadOnly && (forceState === 'focus' || (!forceState && isFocused))

  const remaining = maxLength !== undefined ? maxLength - currentValue.length : null
  const displayCounter = showCounter && maxLength !== undefined

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (!isControlled) setInternalValue(e.target.value)
    onChange?.(e)
  }

  function handleClear() {
    if (!isControlled) setInternalValue('')
  }

  const rootCls = [styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  const wrapperCls = [styles.inputWrapper, hasError ? styles.hasError : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootCls}>
      <FieldLabel
        showLabel={showLabel}
        label={label}
        optional={optional}
        readOnly={isReadOnly}
        descriptionText={descriptionText}
        htmlFor={inputId}
      />

      <div className={wrapperCls} data-state={isReadOnly ? 'readonly' : forceState}>
        {hasError ? (
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.errorIcon}`}
            aria-hidden="true"
          >
            error
          </span>
        ) : (
          <button
            type="button"
            className={styles.clearBtn}
            data-visible={showClear ? 'true' : 'false'}
            onMouseDown={(e) => {
              e.preventDefault()
              handleClear()
            }}
            tabIndex={-1}
            aria-label="Limpar campo"
            aria-hidden={!showClear}
          >
            <span
              className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.clearIcon}`}
              aria-hidden="true"
            >
              close
            </span>
          </button>
        )}

        <textarea
          id={inputId}
          name={name}
          className={`${TEXTAREA_TYPE[size]} ${styles.textarea}`}
          placeholder={placeholder}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          readOnly={isForced || readOnly}
          tabIndex={isForced ? -1 : undefined}
          maxLength={maxLength}
          aria-invalid={hasError || undefined}
        />

        {displayCounter && (
          <p className={`type-caption-xs ${styles.counter}`}>{remaining} caracteres restantes</p>
        )}
      </div>

      <FieldMessage helpText={helpText} errorMessage={errorMessage} hasError={hasError} />
    </div>
  )
}
