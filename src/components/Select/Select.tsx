import { useState, useId, useRef, useEffect } from 'react'
import styles from './Select.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
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
  searchable?: boolean
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
  searchable = false,
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
  const [query, setQuery] = useState('')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const rootRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const optionRefs = useRef<(HTMLLIElement | null)[]>([])

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const isDropdownOpen = forceState === 'active' || isOpen

  const selectedOption = options.find((o) => o.value === currentValue)
  const displayText = selectedOption?.label ?? ''
  const isPlaceholder = !displayText

  const visibleOptions =
    searchable && query
      ? options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()))
      : options

  function openWithHighlight() {
    const idx = visibleOptions.findIndex((o) => o.value === currentValue)
    setHighlightedIndex(idx >= 0 ? idx : 0)
    setIsOpen(true)
  }

  function selectHighlighted() {
    if (highlightedIndex >= 0 && highlightedIndex < visibleOptions.length) {
      handleSelect(visibleOptions[highlightedIndex])
    }
  }

  function handleToggle() {
    if (isForced || isDisabled) return
    if (isOpen) {
      setIsOpen(false)
      setHighlightedIndex(-1)
    } else {
      openWithHighlight()
    }
  }

  function handleSelect(option: SelectOption) {
    if (isForced) return
    if (!isControlled) setInternalValue(option.value)
    onChange?.(option.value)
    setQuery('')
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      setIsOpen(false)
      setHighlightedIndex(-1)
      return
    }

    if (e.key === 'Tab') {
      if (isOpen) {
        setIsOpen(false)
        setHighlightedIndex(-1)
      }
      return
    }

    if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && !isForced && !isDisabled) {
      e.preventDefault()
      if (!isOpen) {
        const idx = visibleOptions.findIndex((o) => o.value === currentValue)
        setHighlightedIndex(
          e.key === 'ArrowDown'
            ? idx >= 0 ? idx : 0
            : idx >= 0 ? idx : visibleOptions.length - 1
        )
        setIsOpen(true)
      } else {
        setHighlightedIndex((i) =>
          e.key === 'ArrowDown'
            ? Math.min(i + 1, visibleOptions.length - 1)
            : Math.max(i - 1, 0)
        )
      }
      return
    }

    if ((e.key === 'Enter' || e.key === ' ') && !isForced && !isDisabled) {
      e.preventDefault()
      if (isOpen) {
        if (highlightedIndex >= 0) {
          selectHighlighted()
        } else {
          setIsOpen(false)
        }
      } else {
        openWithHighlight()
      }
      return
    }
  }

  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setIsOpen(false)
      setQuery('')
      setHighlightedIndex(-1)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.min(i + 1, visibleOptions.length - 1))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((i) => Math.max(i - 1, 0))
      return
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (highlightedIndex >= 0) {
        selectHighlighted()
      }
      return
    }
  }

  useEffect(() => {
    if (!isOpen) return
    function onOutsideClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setQuery('')
        setHighlightedIndex(-1)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [isOpen])

  useEffect(() => {
    if (searchable && isDropdownOpen) {
      searchInputRef.current?.focus()
    }
  }, [searchable, isDropdownOpen])

  useEffect(() => {
    if (highlightedIndex >= 0) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({ block: 'nearest' })
    }
  }, [highlightedIndex])

  const rootCls = [styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  const wrapperCls = [styles.inputWrapper, hasError ? styles.hasError : '']
    .filter(Boolean)
    .join(' ')

  // forceState='active' shows dropdown without any border override (matches Figma normal border for open state)
  const dataState = forceState === 'active' ? undefined : forceState

  const activeDescendant =
    isDropdownOpen && highlightedIndex >= 0
      ? `${listboxId}-opt-${highlightedIndex}`
      : undefined

  return (
    <div className={rootCls} ref={rootRef}>
      <FieldLabel
        showLabel={showLabel}
        label={label}
        optional={optional}
        descriptionText={descriptionText}
        htmlFor={triggerId}
      />

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
          aria-activedescendant={activeDescendant}
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
              ]
                .filter(Boolean)
                .join(' ')}
              aria-hidden="true"
            >
              keyboard_arrow_down
            </span>
          </span>
        </button>

        <div
          className={[styles.dropdown, isDropdownOpen ? styles.dropdownOpen : '']
            .filter(Boolean)
            .join(' ')}
        >
          {searchable && (
            <div className={styles.searchWrap}>
              <span
                className={`material-symbols-rounded icon-sm ${styles.searchIcon}`}
                aria-hidden="true"
              >
                search
              </span>
              <input
                ref={searchInputRef}
                type="text"
                role="combobox"
                className={`type-body-sm ${styles.searchInput}`}
                placeholder="Buscar..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setHighlightedIndex(0)
                }}
                onKeyDown={handleSearchKeyDown}
                aria-controls={listboxId}
                aria-expanded={isDropdownOpen}
                aria-activedescendant={activeDescendant}
                tabIndex={isDropdownOpen ? 0 : -1}
              />
            </div>
          )}
          <div className={styles.listboxScroll}>
          <ul
            id={listboxId}
            className={styles.listbox}
            role="listbox"
            aria-label={label}
            aria-hidden={!isDropdownOpen}
          >
            {visibleOptions.map((option, index) => {
              const isSelected = option.value === currentValue
              const isHighlighted = index === highlightedIndex
              return (
                <li
                  key={option.value}
                  id={`${listboxId}-opt-${index}`}
                  ref={(el) => { optionRefs.current[index] = el }}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    'type-caption-lg',
                    styles.option,
                    isSelected ? styles.optionSelected : '',
                    isHighlighted ? styles.optionHighlighted : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    handleSelect(option)
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {option.label}
                </li>
              )
            })}
          </ul>
          </div>
        </div>
      </div>

      {name && <input type="hidden" name={name} value={currentValue} />}

      <FieldMessage helpText={helpText} errorMessage={errorMessage} hasError={hasError} />
    </div>
  )
}
