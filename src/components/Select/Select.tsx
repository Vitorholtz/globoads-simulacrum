import { useState, useId, useRef, useEffect } from 'react'
import styles from './Select.module.css'
import type { SelectSize, SelectOption } from '../../tokens/select'

export type { SelectSize, SelectOption }

export interface SelectProps {
  size?: SelectSize
  label?: string
  showLabel?: boolean
  optional?: boolean
  descriptionText?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  options?: SelectOption[]
  forceState?: 'hover' | 'focus' | 'active' | 'error' | 'disabled'
  id?: string
  name?: string
  value?: string
  defaultValue?: string
  disabled?: boolean
  onChange?: (value: string) => void
  className?: string
}

const TRIGGER_TYPE: Record<SelectSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

const DEFAULT_OPTIONS: SelectOption[] = [
  { value: 'item-1', label: 'Item 1' },
  { value: 'item-2', label: 'Item 2' },
  { value: 'item-3', label: 'Item 3' },
  { value: 'item-4', label: 'Item 4' },
]

export default function Select({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  descriptionText,
  placeholder = 'Text here',
  helpText,
  errorMessage,
  options = DEFAULT_OPTIONS,
  forceState,
  id,
  name,
  value,
  defaultValue,
  disabled,
  onChange,
  className,
}: SelectProps) {
  const generatedId = useId()
  const triggerId = id ?? generatedId
  const listboxId = `${triggerId}-listbox`

  const [internalValue, setInternalValue] = useState(defaultValue ?? '')
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const isDropdownOpen = forceState === 'active' || isOpen

  const selectedOption = options.find(o => o.value === currentValue)
  const displayText = selectedOption?.label ?? ''
  const isPlaceholder = !displayText

  function handleToggle() {
    if (isForced || isDisabled) return
    setIsOpen(prev => !prev)
  }

  function handleSelect(option: SelectOption) {
    if (isForced) return
    if (!isControlled) setInternalValue(option.value)
    onChange?.(option.value)
    setIsOpen(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      setIsOpen(false)
    }
    if ((e.key === 'Enter' || e.key === ' ') && !isForced && !isDisabled) {
      e.preventDefault()
      setIsOpen(prev => !prev)
    }
  }

  useEffect(() => {
    if (!isOpen) return
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [isOpen])

  const rootCls = [
    styles.root,
    styles[size],
    isDisabled ? styles.disabled : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  const wrapperCls = [
    styles.inputWrapper,
    hasError ? styles.hasError : '',
  ].filter(Boolean).join(' ')

  // forceState='active' shows dropdown without any border override (matches Figma normal border for open state)
  const dataState = forceState === 'active' ? undefined : forceState

  return (
    <div className={rootCls} ref={rootRef}>
      {showLabel && (
        <div className={styles.labelRow}>
          <div className={styles.labelGroup}>
            <label className={`type-caption-md ${styles.label}`} htmlFor={triggerId}>
              {label}
            </label>
            {descriptionText && (
              <span className={styles.descriptionBtn} role="button" tabIndex={0} aria-label="Mais informações">
                <span
                  className={`material-symbols-rounded icon-xs ${styles.descriptionIcon}`}
                  aria-hidden="true"
                >
                  info
                </span>
                <span className={`type-body-sm ${styles.tooltip}`} role="tooltip">
                  {descriptionText}
                  <span className={styles.tooltipArrow} aria-hidden="true" />
                </span>
              </span>
            )}
          </div>
          {optional && <span className={`type-caption-sm ${styles.optionalTag}`}>Opcional</span>}
        </div>
      )}

      <div className={wrapperCls} data-state={dataState}>
        <button
          id={triggerId}
          type="button"
          className={`${TRIGGER_TYPE[size]} ${styles.trigger}`}
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          tabIndex={isForced ? -1 : undefined}
          aria-haspopup="listbox"
          aria-expanded={isDropdownOpen}
          aria-controls={isDropdownOpen ? listboxId : undefined}
          aria-invalid={hasError || undefined}
        >
          <span className={isPlaceholder ? styles.placeholder : styles.selectedText}>
            {isPlaceholder ? placeholder : displayText}
          </span>

          <span className={styles.trailingIcons}>
            {hasError && (
              <span
                className={`material-symbols-rounded icon-md ${styles.errorIcon}`}
                aria-hidden="true"
              >
                error
              </span>
            )}
            <span
              className={[
                'material-symbols-rounded',
                'icon-md',
                styles.chevronIcon,
                isDropdownOpen ? styles.chevronOpen : '',
              ].filter(Boolean).join(' ')}
              aria-hidden="true"
            >
              keyboard_arrow_down
            </span>
          </span>
        </button>

        <div className={[styles.dropdown, isDropdownOpen ? styles.dropdownOpen : ''].filter(Boolean).join(' ')}>
          <ul
            id={listboxId}
            className={styles.listbox}
            role="listbox"
            aria-label={label}
            aria-hidden={!isDropdownOpen}
          >
            {options.map((option) => {
              const isSelected = option.value === currentValue
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  className={['type-caption-lg', styles.option, isSelected ? styles.optionSelected : ''].filter(Boolean).join(' ')}
                  onMouseDown={(e) => { e.preventDefault(); handleSelect(option) }}
                >
                  {option.label}
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {name && <input type="hidden" name={name} value={currentValue} />}

      {helpText && !hasError && (
        <p className={`type-body-xs ${styles.helpText}`}>{helpText}</p>
      )}
      {hasError && errorMessage && (
        <p className={`type-body-xs ${styles.errorText}`}>{errorMessage}</p>
      )}
    </div>
  )
}
