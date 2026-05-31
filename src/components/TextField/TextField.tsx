import { useState, useId } from 'react'
import styles from './TextField.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { TextFieldSize, TextFieldMask } from '../../tokens/textField'

export type { TextFieldSize, TextFieldMask }

function applyMask(value: string, mask: TextFieldMask): string {
  const d = value.replace(/\D/g, '')
  switch (mask) {
    case 'cpf': {
      const s = d.slice(0, 11)
      if (s.length <= 3) return s
      if (s.length <= 6) return `${s.slice(0, 3)}.${s.slice(3)}`
      if (s.length <= 9) return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6)}`
      return `${s.slice(0, 3)}.${s.slice(3, 6)}.${s.slice(6, 9)}-${s.slice(9)}`
    }
    case 'cnpj': {
      const s = d.slice(0, 14)
      if (s.length <= 2) return s
      if (s.length <= 5) return `${s.slice(0, 2)}.${s.slice(2)}`
      if (s.length <= 8) return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5)}`
      if (s.length <= 12) return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}/${s.slice(8)}`
      return `${s.slice(0, 2)}.${s.slice(2, 5)}.${s.slice(5, 8)}/${s.slice(8, 12)}-${s.slice(12)}`
    }
    case 'phone': {
      const s = d.slice(0, 11)
      if (s.length === 0) return ''
      if (s.length <= 2) return `(${s}`
      const area = s.slice(0, 2)
      const rest = s.slice(2)
      if (s.length <= 6) return `(${area}) ${rest}`
      if (s.length <= 10) return `(${area}) ${rest.slice(0, 4)}-${rest.slice(4)}`
      return `(${area}) ${rest.slice(0, 5)}-${rest.slice(5)}`
    }
    case 'cep': {
      const s = d.slice(0, 8)
      if (s.length <= 5) return s
      return `${s.slice(0, 5)}-${s.slice(5)}`
    }
    case 'date': {
      const s = d.slice(0, 8)
      if (s.length <= 2) return s
      if (s.length <= 4) return `${s.slice(0, 2)}/${s.slice(2)}`
      return `${s.slice(0, 2)}/${s.slice(2, 4)}/${s.slice(4)}`
    }
  }
}

const MASK_MAX_LENGTH: Record<TextFieldMask, number> = {
  cpf: 14, cnpj: 18, phone: 15, cep: 9, date: 10,
}

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
  mask?: TextFieldMask
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
  mask,
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
    const next = mask ? applyMask(e.target.value, mask) : e.target.value
    if (!isControlled) setInternalValue(next)
    if (mask) e.target.value = next
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
          inputMode={mask ? 'numeric' : undefined}
          maxLength={mask ? MASK_MAX_LENGTH[mask] : undefined}
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
