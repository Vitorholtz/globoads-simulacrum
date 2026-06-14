import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './DateRangePicker.module.css'
import Calendar from '../Calendar/Calendar'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { DatePickerSize } from '../../tokens/datePicker'
import { cx } from '../../utils/cx'

export interface DateRange {
  start: Date
  end: Date
}

export interface DateRangePickerProps {
  size?: DatePickerSize
  label?: string
  showLabel?: boolean
  optional?: boolean
  value?: { start: Date | null; end: Date | null }
  defaultValue?: { start: Date | null; end: Date | null }
  onChange?: (range: DateRange) => void
  helpText?: string
  disabled?: boolean
  readOnly?: boolean
  forceState?: 'hover' | 'focus' | 'active' | 'disabled' | 'readonly'
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

export default function DateRangePicker({
  size = 'md',
  label = 'Período',
  showLabel = true,
  optional = false,
  value,
  defaultValue,
  onChange,
  helpText,
  disabled,
  readOnly,
  forceState,
  id,
  className,
}: DateRangePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const endInputId = `${inputId}-end`
  const popupId = `${inputId}-popup`
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const calendarBtnRef = useRef<HTMLButtonElement>(null)

  const [internalStart, setInternalStart] = useState<Date | null>(defaultValue?.start ?? null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(defaultValue?.end ?? null)
  const [startInputText, setStartInputText] = useState(() =>
    formatDate(value?.start ?? defaultValue?.start ?? null)
  )
  const [endInputText, setEndInputText] = useState(() =>
    formatDate(value?.end ?? defaultValue?.end ?? null)
  )
  const [pendingStart, setPendingStart] = useState<Date | null>(null)
  const [pendingEnd, setPendingEnd] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [popupPos, setPopupPos] = useState<{ top: number; left: number; minWidth: number } | null>(
    null
  )

  const isControlled = value !== undefined
  const currentStart = isControlled ? (value.start ?? null) : internalStart
  const currentEnd = isControlled ? (value.end ?? null) : internalEnd
  const isDisabled = disabled || forceState === 'disabled'
  const isReadOnly = !isDisabled && (readOnly || forceState === 'readonly')
  const isActive =
    forceState === 'active' || forceState === 'focus' || (!forceState && isOpen && !isLeaving)

  const [prevStart, setPrevStart] = useState(value?.start)
  const [prevEnd, setPrevEnd] = useState(value?.end)
  if (isControlled) {
    if (value?.start !== prevStart) {
      setPrevStart(value?.start)
      setStartInputText(formatDate(value?.start ?? null))
    }
    if (value?.end !== prevEnd) {
      setPrevEnd(value?.end)
      setEndInputText(formatDate(value?.end ?? null))
    }
  }

  // Close on outside click
  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node
      if (!containerRef.current?.contains(target) && !popupRef.current?.contains(target)) {
        setIsLeaving(true)
        setSelecting('start')
        setHoverDate(null)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen])

  // Auto-focus first focusable element in the calendar when it opens
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

  // Popup position
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

  function handleStartInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyDateMask(e.target.value)
    setStartInputText(masked)
    const parsed = parseDateString(masked)
    if (parsed) {
      setPendingStart(parsed)
      if (!isControlled) setInternalStart(parsed)
      const endDate = parseDateString(endInputText) ?? currentEnd
      if (endDate) onChange?.({ start: parsed, end: endDate })
    } else if (masked === '') {
      setPendingStart(null)
      if (!isControlled) setInternalStart(null)
    }
  }

  function handleEndInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyDateMask(e.target.value)
    setEndInputText(masked)
    const parsed = parseDateString(masked)
    if (parsed) {
      setPendingEnd(parsed)
      if (!isControlled) setInternalEnd(parsed)
      const startDate = parseDateString(startInputText) ?? currentStart
      if (startDate) onChange?.({ start: startDate, end: parsed })
    } else if (masked === '') {
      setPendingEnd(null)
      if (!isControlled) setInternalEnd(null)
    }
  }

  function handleDateClick(date: Date) {
    if (selecting === 'start' || (pendingStart && pendingEnd)) {
      setPendingStart(date)
      setPendingEnd(null)
      setSelecting('end')
      setHoverDate(null)
    } else {
      if (!pendingStart || date >= pendingStart) {
        setPendingEnd(date)
        setSelecting('start')
        setHoverDate(null)
      } else {
        setPendingStart(date)
        setPendingEnd(null)
        setHoverDate(null)
      }
    }
  }

  function handleConfirm() {
    if (pendingStart && pendingEnd) {
      setStartInputText(formatDate(pendingStart))
      setEndInputText(formatDate(pendingEnd))
      if (!isControlled) {
        setInternalStart(pendingStart)
        setInternalEnd(pendingEnd)
      }
      onChange?.({ start: pendingStart, end: pendingEnd })
    }
    setIsLeaving(true)
  }

  function handleCancel() {
    setIsLeaving(true)
    setSelecting('start')
    setHoverDate(null)
  }

  function handleToggle() {
    if (isDisabled || !!forceState || isReadOnly) return
    if (isLeaving) {
      setIsLeaving(false)
      return
    }
    if (isOpen) {
      setIsLeaving(true)
    } else {
      setPendingStart(parseDateString(startInputText) ?? currentStart)
      setPendingEnd(parseDateString(endInputText) ?? currentEnd)
      setSelecting('start')
      setIsOpen(true)
    }
  }

  const rootCls = [styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  const wrapperStateAttr = isReadOnly
    ? 'readonly'
    : forceState && forceState !== 'disabled'
      ? forceState
      : undefined

  const wrapperCls = [styles.inputWrapper, isActive ? styles.isActive : '']
    .filter(Boolean)
    .join(' ')

  const escKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsLeaving(true)
      setSelecting('start')
    }
  }

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

      <div ref={wrapperRef} className={wrapperCls} data-state={wrapperStateAttr}>
        <input
          id={inputId}
          type="text"
          className={`${INPUT_TYPE[size]} ${styles.inputField}`}
          inputMode="numeric"
          maxLength={10}
          placeholder="DD/MM/AAAA"
          value={startInputText}
          onChange={handleStartInputChange}
          disabled={isDisabled}
          readOnly={!!forceState || isReadOnly}
          tabIndex={forceState ? -1 : undefined}
          onKeyDown={escKeyDown}
        />

        <span className={`material-symbols-rounded icon-sm ${styles.arrowIcon}`} aria-hidden="true">
          east
        </span>

        <input
          id={endInputId}
          type="text"
          className={`${INPUT_TYPE[size]} ${styles.inputField}`}
          inputMode="numeric"
          maxLength={10}
          placeholder="DD/MM/AAAA"
          value={endInputText}
          onChange={handleEndInputChange}
          disabled={isDisabled}
          readOnly={!!forceState || isReadOnly}
          tabIndex={forceState ? -1 : undefined}
          onKeyDown={escKeyDown}
        />

        <button
          ref={calendarBtnRef}
          type="button"
          className={styles.calendarBtn}
          onClick={handleToggle}
          disabled={isDisabled || !!forceState}
          aria-disabled={isReadOnly || undefined}
          tabIndex={forceState ? -1 : undefined}
          aria-expanded={isOpen && !isLeaving}
          aria-haspopup="dialog"
          aria-controls={popupId}
          aria-label="Abrir calendário"
        >
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.calendarIcon}`}
            aria-hidden="true"
          >
            calendar_today
          </span>
        </button>
      </div>

      {helpText && <FieldMessage helpText={helpText} />}

      {(isOpen || isLeaving) &&
        !forceState &&
        popupPos &&
        createPortal(
          <div
            id={popupId}
            ref={popupRef}
            className={cx(styles.calendarPopup, isLeaving ? styles.calendarPopupLeaving : '')}
            style={{ position: 'fixed', top: popupPos.top, left: popupPos.left }}
            role="dialog"
            aria-modal="false"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsLeaving(true)
                setSelecting('start')
              }
            }}
            onAnimationEnd={() => {
              if (isLeaving) {
                setIsLeaving(false)
                setIsOpen(false)
                calendarBtnRef.current?.focus()
              }
            }}
          >
            {selecting === 'end' && (
              <div className={styles.selectingHint}>Selecione a data de fim</div>
            )}
            <Calendar
              size="sm"
              rangeStart={pendingStart}
              rangeEnd={pendingEnd}
              hoverDate={hoverDate}
              onHoverChange={setHoverDate}
              onChange={handleDateClick}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              confirmDisabled={!pendingStart || !pendingEnd}
            />
          </div>,
          document.body
        )}
    </div>
  )
}
