import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './DatePicker.module.css'
import Calendar from '../Calendar/Calendar'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { DatePickerSize } from '../../tokens/datePicker'

export interface DatePickerProps {
  size?: DatePickerSize
  label?: string
  /** Hides the label visually; it remains in the DOM for screen readers */
  showLabel?: boolean
  /** Appends "(opcional)" to the label */
  optional?: boolean
  helpText?: string
  errorMessage?: string
  value?: Date | null
  defaultValue?: Date | null
  onChange?: (date: Date | null) => void
  disabled?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'error' | 'disabled'
  id?: string
  className?: string
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

function applyDateMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

function parseDateString(text: string): Date | null {
  if (text.length !== 10) return null
  const [dd, mm, yyyy] = text.split('/')
  const dv = parseInt(dd, 10),
    mv = parseInt(mm, 10) - 1,
    yv = parseInt(yyyy, 10)
  if (isNaN(dv) || isNaN(mv) || isNaN(yv)) return null
  const date = new Date(yv, mv, dv)
  if (date.getFullYear() !== yv || date.getMonth() !== mv || date.getDate() !== dv) return null
  return date
}

const ICON_CLS: Record<DatePickerSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const INPUT_TYPE: Record<DatePickerSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

export default function DatePicker({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  helpText,
  errorMessage,
  value,
  defaultValue,
  onChange,
  disabled,
  forceState,
  id,
  className,
}: DatePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const popupId = `${inputId}-popup`
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const calendarBtnRef = useRef<HTMLButtonElement>(null)

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const [inputText, setInputText] = useState<string>(() =>
    value !== undefined ? formatDate(value) : formatDate(defaultValue ?? null)
  )
  const [pendingDate, setPendingDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; left: number; minWidth: number } | null>(
    null
  )

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const [prevControlledValue, setPrevControlledValue] = useState(value)
  if (isControlled && value !== prevControlledValue) {
    setPrevControlledValue(value)
    setInputText(formatDate(value ?? null))
  }

  const isDisabled = disabled || forceState === 'disabled'
  const hasTypedError = inputText.length === 10 && !parseDateString(inputText)
  const hasError = forceState === 'error' || hasTypedError || (!!errorMessage && !forceState)
  const displayError = hasTypedError && !errorMessage ? 'Data inválida' : errorMessage
  const isActive =
    forceState === 'active' || forceState === 'focus' || (!forceState && isOpen && !isLeaving)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node
      const insideContainer = containerRef.current?.contains(target)
      const insidePopup = popupRef.current?.contains(target)
      if (!insideContainer && !insidePopup) setIsLeaving(true)
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  // Move focus into the calendar when it opens.
  // requestAnimationFrame defers until after the popup is in the DOM
  // (useLayoutEffect sets popupPos → re-render → popup mounts → then rAF fires).
  useEffect(() => {
    if (!isOpen || isLeaving) return
    const frame = requestAnimationFrame(() => {
      const rovingDay = popupRef.current?.querySelector<HTMLButtonElement>(
        '[data-day][tabindex="0"]'
      )
      const firstFocusable = popupRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      ;(rovingDay ?? firstFocusable)?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [isOpen, isLeaving])

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current) return
    function updatePos() {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      setPopupPos({ top: rect.bottom + 4, left: rect.left + rect.width / 2, minWidth: rect.width })
    }
    updatePos()
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)
    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [isOpen])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyDateMask(e.target.value)
    setInputText(masked)
    const parsed = parseDateString(masked)
    if (parsed) {
      if (!isControlled) setInternalValue(parsed)
      onChange?.(parsed)
    } else if (masked === '') {
      if (!isControlled) setInternalValue(null)
      onChange?.(null)
    }
  }

  function handleCalendarChange(date: Date) {
    setPendingDate(date)
  }

  function handleConfirm() {
    if (pendingDate) {
      setInputText(formatDate(pendingDate))
      if (!isControlled) setInternalValue(pendingDate)
      onChange?.(pendingDate)
    }
    setIsLeaving(true)
  }

  function handleCancel() {
    setPendingDate(null)
    setIsLeaving(true)
  }

  function handleToggle() {
    if (isDisabled || !!forceState) return
    if (isLeaving) {
      setIsLeaving(false)
      return
    }
    if (isOpen) {
      setIsLeaving(true)
    } else {
      const parsed = parseDateString(inputText)
      setPendingDate(parsed ?? currentValue ?? null)
      setIsOpen(true)
    }
  }

  const rootCls = [styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  const wrapperStateAttr = forceState && forceState !== 'disabled' ? forceState : undefined

  const wrapperCls = [
    styles.inputWrapper,
    hasError ? styles.hasError : '',
    isActive && !hasError ? styles.isActive : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rootCls} ref={containerRef}>
      <FieldLabel showLabel={showLabel} label={label} optional={optional} htmlFor={inputId} />

      <div ref={wrapperRef} className={wrapperCls} data-state={wrapperStateAttr}>
        <input
          id={inputId}
          type="text"
          className={`${INPUT_TYPE[size]} ${styles.inputField}`}
          inputMode="numeric"
          maxLength={10}
          placeholder="DD/MM/AAAA"
          value={inputText}
          onChange={handleInputChange}
          disabled={isDisabled}
          readOnly={!!forceState}
          tabIndex={forceState ? -1 : undefined}
          aria-invalid={hasError || undefined}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsLeaving(true)
          }}
        />

        {hasError && (
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.errorIcon}`}
            aria-hidden="true"
          >
            error
          </span>
        )}

        <button
          ref={calendarBtnRef}
          type="button"
          className={styles.calendarBtn}
          onClick={handleToggle}
          disabled={isDisabled || !!forceState}
          tabIndex={forceState ? -1 : undefined}
          aria-expanded={isOpen && !isLeaving}
          aria-haspopup="dialog"
          aria-controls={isOpen && !isLeaving ? popupId : undefined}
          aria-label="Abrir calendário"
        >
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${hasError ? styles.errorCalendarIcon : styles.calendarIcon}`}
            aria-hidden="true"
          >
            calendar_today
          </span>
        </button>
      </div>

      {(isOpen || isLeaving) &&
        !forceState &&
        popupPos &&
        createPortal(
          <div
            id={popupId}
            ref={popupRef}
            className={[styles.calendarPopup, isLeaving ? styles.calendarPopupLeaving : '']
              .filter(Boolean)
              .join(' ')}
            style={{ position: 'fixed', top: popupPos.top, left: popupPos.left }}
            role="dialog"
            aria-modal="false"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsLeaving(true)
            }}
            onAnimationEnd={() => {
              if (isLeaving) {
                setIsLeaving(false)
                setIsOpen(false)
                calendarBtnRef.current?.focus()
              }
            }}
          >
            <Calendar
              size="sm"
              value={pendingDate ?? undefined}
              onChange={handleCalendarChange}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              confirmDisabled={!pendingDate}
            />
          </div>,
          document.body
        )}

      <FieldMessage helpText={helpText} errorMessage={displayError} hasError={hasError} />
    </div>
  )
}
