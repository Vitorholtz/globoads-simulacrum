import { useState, useId } from 'react'
import styles from './TextField.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { TextFieldSize } from '../../tokens/textField'

export type { TextFieldSize }

export interface TextFieldProps {
  size?: TextFieldSize
  label?: string
  showLabel?: boolean
  optional?: boolean
  /** Texto exibido no tooltip do ícone de informação ao lado da label */
  descriptionText?: string
  leadingIcon?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'error' | 'disabled'
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  readOnly?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
}

const INPUT_TYPE: Record<TextFieldSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

const ICON_CLS: Record<TextFieldSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const SMALL_ICON_CLS: Record<TextFieldSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-md',
}

export default function TextField({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  descriptionText,
  leadingIcon,
  placeholder = 'Text here',
  helpText,
  errorMessage,
  forceState,
  id,
  name,
  value,
  defaultValue,
  disabled,
  readOnly,
  onChange,
  className,
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [isFocused, setIsFocused] = useState(false)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const showClear = currentValue !== '' && (forceState === 'focus' || (!forceState && isFocused))

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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
        descriptionText={descriptionText}
        htmlFor={inputId}
      />

      <div className={wrapperCls} data-state={forceState}>
        {leadingIcon && (
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.leadingIcon}`}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          className={`${INPUT_TYPE[size]} ${styles.input}`}
          type="text"
          placeholder={placeholder}
          value={isControlled ? value : internalValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={isDisabled}
          readOnly={isForced || readOnly}
          tabIndex={isForced ? -1 : undefined}
          aria-invalid={hasError || undefined}
        />

        {hasError ? (
          <span
            className={`material-symbols-rounded ${SMALL_ICON_CLS[size]} ${styles.errorIcon}`}
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
              className={`material-symbols-rounded ${SMALL_ICON_CLS[size]} ${styles.clearIcon}`}
              aria-hidden="true"
            >
              close
            </span>
          </button>
        )}
      </div>

      <FieldMessage helpText={helpText} errorMessage={errorMessage} hasError={hasError} />
    </div>
  )
}
