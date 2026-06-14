import { useState, useId, useRef, useCallback, useEffect } from 'react'
import styles from './TextField.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import Toast from '../Toast/Toast'
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
    case 'url': {
      if (value === '') return ''
      const lower = value.toLowerCase()
      if (lower.startsWith('http://') || lower.startsWith('https://')) return value
      if ('http://'.startsWith(lower) || 'https://'.startsWith(lower)) return value
      return `https://${value}`
    }
  }
}

const MASK_MAX_LENGTH: Record<TextFieldMask, number> = {
  cpf: 14,
  cnpj: 18,
  phone: 15,
  cep: 9,
  date: 10,
  url: 2048,
}

const MASK_INPUT_MODE: Record<TextFieldMask, React.HTMLAttributes<HTMLInputElement>['inputMode']> =
  {
    cpf: 'numeric',
    cnpj: 'numeric',
    phone: 'numeric',
    cep: 'numeric',
    date: 'numeric',
    url: 'url',
  }

const COPY_TOAST_DISMISS_MS = 4000
const COPY_TOAST_EXIT_MS = 250

export interface TextFieldProps {
  size?: TextFieldSize
  label?: string
  /** Hides the label visually; it remains in the DOM for screen readers */
  showLabel?: boolean
  /** Appends "(opcional)" to the label */
  optional?: boolean
  /** Tooltip text shown on the info icon beside the label */
  descriptionText?: string
  /** Material Symbol icon name shown at the start of the input */
  leadingIcon?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'error' | 'disabled' | 'readonly'
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  readOnly?: boolean
  /** Applies an input mask — auto-formats digits as CPF, CNPJ, phone, CEP, date, or URL */
  mask?: TextFieldMask
  /** 'password' adds a show/hide toggle that reveals the typed content */
  type?: 'text' | 'password'
  /** Shows a button that copies the field's value to the clipboard and confirms with a Toast */
  copyable?: boolean
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
  type = 'text',
  copyable = false,
  onChange,
  className,
}: TextFieldProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const inputRef = useRef<HTMLInputElement>(null)

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [copyToastVisible, setCopyToastVisible] = useState(false)
  const [copyToastLeaving, setCopyToastLeaving] = useState(false)
  const copyDismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const copyLeaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const isReadOnly = !isDisabled && (readOnly || forceState === 'readonly')
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const showClear =
    currentValue !== '' && !isReadOnly && (forceState === 'focus' || (!forceState && isFocused))
  const inputType = type === 'password' && !showPassword ? 'password' : 'text'

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = mask ? applyMask(e.target.value, mask) : e.target.value
    if (!isControlled) setInternalValue(next)
    if (mask) e.target.value = next
    onChange?.(e)
  }

  function handleClear() {
    if (!isControlled) setInternalValue('')
    if (onChange && inputRef.current) {
      inputRef.current.value = ''
      onChange({
        target: inputRef.current,
        currentTarget: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>)
    }
  }

  const startCopyToastExit = useCallback(() => {
    setCopyToastLeaving(true)
    copyLeaveTimerRef.current = setTimeout(() => {
      setCopyToastVisible(false)
      setCopyToastLeaving(false)
    }, COPY_TOAST_EXIT_MS)
  }, [])

  function handleCopy() {
    if (!currentValue) return
    void navigator.clipboard.writeText(currentValue)
    if (copyDismissTimerRef.current) clearTimeout(copyDismissTimerRef.current)
    if (copyLeaveTimerRef.current) clearTimeout(copyLeaveTimerRef.current)
    setCopyToastLeaving(false)
    setCopyToastVisible(true)
    copyDismissTimerRef.current = setTimeout(startCopyToastExit, COPY_TOAST_DISMISS_MS)
  }

  useEffect(
    () => () => {
      if (copyDismissTimerRef.current) clearTimeout(copyDismissTimerRef.current)
      if (copyLeaveTimerRef.current) clearTimeout(copyLeaveTimerRef.current)
    },
    []
  )

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

      <div className={wrapperCls} data-state={isReadOnly ? 'readonly' : forceState}>
        {leadingIcon && (
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.leadingIcon}`}
            aria-hidden="true"
          >
            {leadingIcon}
          </span>
        )}

        <input
          ref={inputRef}
          id={inputId}
          name={name}
          className={`${INPUT_TYPE[size]} ${styles.input}`}
          type={inputType}
          inputMode={mask ? MASK_INPUT_MODE[mask] : undefined}
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

        {copyable && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleCopy}
            disabled={isDisabled || !currentValue}
            tabIndex={isForced ? -1 : undefined}
            aria-label="Copiar conteúdo"
          >
            <span
              className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.actionIcon}`}
              aria-hidden="true"
            >
              content_copy
            </span>
          </button>
        )}

        {type === 'password' && (
          <button
            type="button"
            className={styles.actionBtn}
            onClick={() => setShowPassword((v) => !v)}
            tabIndex={isForced ? -1 : undefined}
            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            aria-pressed={showPassword}
          >
            <span
              className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.actionIcon}`}
              aria-hidden="true"
            >
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        )}

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
      </div>

      <FieldMessage helpText={helpText} errorMessage={errorMessage} hasError={hasError} />

      {copyToastVisible && (
        <div
          className={[styles.copyToast, copyToastLeaving ? styles.leaving : '']
            .filter(Boolean)
            .join(' ')}
        >
          <Toast
            type="neutral"
            title="Conteúdo copiado!"
            description="O conteúdo foi copiado para a área de transferência."
            onClose={startCopyToastExit}
          />
        </div>
      )}
    </div>
  )
}
