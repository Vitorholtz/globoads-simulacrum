import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './DatePicker.module.css'
import Calendar from '../Calendar/Calendar'
import type { DatePickerSize } from '../../tokens/datePicker'

export interface DatePickerProps {
  size?: DatePickerSize
  label?: string
  showLabel?: boolean
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

const ICON_CLS: Record<DatePickerSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
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
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue ?? null)
  const [pendingDate, setPendingDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; left: number; minWidth: number } | null>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const isDisabled = disabled || forceState === 'disabled'
  const hasError = forceState === 'error' || (!!errorMessage && !forceState)
  const isActive = forceState === 'active' || forceState === 'focus' || (!forceState && isOpen)

  const displayValue = formatDate(currentValue)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node
      const insideContainer = containerRef.current?.contains(target)
      const insidePopup = popupRef.current?.contains(target)
      if (!insideContainer && !insidePopup) setIsOpen(false)
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

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

  function handleCalendarChange(date: Date) {
    setPendingDate(date)
  }

  function handleConfirm() {
    if (pendingDate) {
      if (!isControlled) setInternalValue(pendingDate)
      onChange?.(pendingDate)
    }
    setIsOpen(false)
  }

  function handleCancel() {
    setPendingDate(null)
    setIsOpen(false)
  }

  function handleToggle() {
    if (isDisabled || !!forceState) return
    if (!isOpen) setPendingDate(currentValue ?? null)
    setIsOpen(o => !o)
  }

  const rootCls = [
    styles.root,
    styles[size],
    isDisabled ? styles.disabled : '',
    className ?? '',
  ].filter(Boolean).join(' ')

  const wrapperStateAttr = forceState && forceState !== 'disabled' ? forceState : undefined

  const wrapperCls = [
    styles.inputWrapper,
    hasError ? styles.hasError : '',
    isActive && !hasError ? styles.isActive : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={rootCls} ref={containerRef}>
      {showLabel && (
        <div className={styles.labelRow}>
          <label className={`type-caption-md ${styles.label}`} htmlFor={inputId}>
            {label}
          </label>
          {optional && <span className={`type-caption-sm ${styles.optionalTag}`}>Opcional</span>}
        </div>
      )}

      <div
        id={inputId}
        ref={wrapperRef}
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={wrapperCls}
        data-state={wrapperStateAttr}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle() }
          if (e.key === 'Escape') setIsOpen(false)
        }}
      >
        <span className={[styles.inputText, displayValue ? styles.filled : ''].filter(Boolean).join(' ')}>
          {displayValue || 'dd/mm/aa'}
        </span>

        {hasError ? (
          <>
            <span
              className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.calendarIcon} ${styles.errorCalendarIcon}`}
              aria-hidden="true"
            >
              calendar_today
            </span>
            <span
              className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.errorIcon}`}
              aria-hidden="true"
            >
              error
            </span>
          </>
        ) : (
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.calendarIcon}`}
            aria-hidden="true"
          >
            calendar_today
          </span>
        )}
      </div>

      {isOpen && !forceState && popupPos && createPortal(
        <div
          ref={popupRef}
          className={styles.calendarPopup}
          style={{ position: 'fixed', top: popupPos.top, left: popupPos.left }}
          role="dialog"
          aria-modal="false"
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

      {helpText && !hasError && (
        <p className={`type-body-xs ${styles.helpText}`}>{helpText}</p>
      )}
      {hasError && errorMessage && (
        <p className={`type-body-xs ${styles.errorText}`}>{errorMessage}</p>
      )}
    </div>
  )
}
