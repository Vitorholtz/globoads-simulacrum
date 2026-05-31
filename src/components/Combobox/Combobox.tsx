import { useState, useId } from 'react'
import styles from './Combobox.module.css'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { ComboboxSize } from '../../tokens/combobox'
import ChipInput from '../ChipInput/ChipInput'

export type { ComboboxSize }

export interface ComboboxProps {
  size?: ComboboxSize
  label?: string
  showLabel?: boolean
  optional?: boolean
  descriptionText?: string
  placeholder?: string
  helpText?: string
  errorMessage?: string
  forceState?: 'hover' | 'focus' | 'error' | 'disabled'
  id?: string
  name?: string
  value?: string[]
  defaultValue?: string[]
  disabled?: boolean
  onChange?: (values: string[]) => void
  className?: string
}

const ICON_CLS: Record<ComboboxSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const SMALL_ICON_CLS: Record<ComboboxSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-md',
}

export default function Combobox({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  descriptionText,
  placeholder = 'Digite e pressione Enter...',
  helpText,
  errorMessage,
  forceState,
  id,
  name,
  value,
  defaultValue,
  disabled,
  onChange,
  className,
}: ComboboxProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId

  const [internalValues, setInternalValues] = useState<string[]>(defaultValue ?? [])
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [dropIndex, setDropIndex] = useState<number | null>(null)

  const isControlled = value !== undefined
  const chips = isControlled ? value : internalValues

  const isDisabled = disabled || forceState === 'disabled'
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isForced = !!forceState
  const showClear = query !== '' && (forceState === 'focus' || (!forceState && isFocused))

  function addChip(text: string) {
    const trimmed = text.trim()
    if (!trimmed || chips.includes(trimmed)) return
    const next = [...chips, trimmed]
    if (!isControlled) setInternalValues(next)
    onChange?.(next)
    setQuery('')
  }

  function removeChip(chip: string) {
    const next = chips.filter((c) => c !== chip)
    if (!isControlled) setInternalValues(next)
    onChange?.(next)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      addChip(query)
    }
    if (e.key === 'Backspace' && query === '' && chips.length > 0) {
      removeChip(chips[chips.length - 1])
    }
  }

  function handleClear() {
    setQuery('')
  }

  function handleDragStart(e: React.DragEvent, index: number) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
    setDragIndex(index)
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (dropIndex !== index) setDropIndex(index)
  }

  function handleDrop(e: React.DragEvent, index: number) {
    e.preventDefault()
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null)
      setDropIndex(null)
      return
    }
    const next = [...chips]
    const [removed] = next.splice(dragIndex, 1)
    next.splice(index, 0, removed)
    if (!isControlled) setInternalValues(next)
    onChange?.(next)
    setDragIndex(null)
    setDropIndex(null)
  }

  function handleDragEnd() {
    setDragIndex(null)
    setDropIndex(null)
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
        <span
          className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.searchIcon}`}
          aria-hidden="true"
        >
          search
        </span>

        <input
          id={inputId}
          type="text"
          className={styles.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isForced}
          tabIndex={isForced ? -1 : undefined}
          autoComplete="off"
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

      {chips.length > 0 && (
        <div className={styles.chipsArea}>
          {chips.map((chip, index) => (
            <div
              key={chip}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={[
                styles.chipWrapper,
                dragIndex === index ? styles.isDragging : '',
                dropIndex === index && dragIndex !== index ? styles.isDropTarget : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <ChipInput label={chip} style="default" onRemove={() => removeChip(chip)} />
            </div>
          ))}
        </div>
      )}

      {name && chips.map((chip) => <input key={chip} type="hidden" name={name} value={chip} />)}

      <FieldMessage helpText={helpText} errorMessage={errorMessage} hasError={hasError} />
    </div>
  )
}
