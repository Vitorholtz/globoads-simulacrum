import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './DateRangePicker.module.css'
import Calendar from '../Calendar/Calendar'
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
  disabled?: boolean
  forceState?: 'hover' | 'focus' | 'active' | 'disabled'
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

export default function DateRangePicker({
  size = 'md',
  label = 'Período',
  showLabel = true,
  optional = false,
  value,
  defaultValue,
  onChange,
  disabled,
  forceState,
  id,
  className,
}: DateRangePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const popupId = `${inputId}-popup`
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLButtonElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const [internalStart, setInternalStart] = useState<Date | null>(defaultValue?.start ?? null)
  const [internalEnd, setInternalEnd] = useState<Date | null>(defaultValue?.end ?? null)
  const [pendingStart, setPendingStart] = useState<Date | null>(null)
  const [pendingEnd, setPendingEnd] = useState<Date | null>(null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selecting, setSelecting] = useState<'start' | 'end'>('start')
  const [popupPos, setPopupPos] = useState<{ top: number; left: number; minWidth: number } | null>(
    null
  )

  const isControlled = value !== undefined
  const currentStart = isControlled ? (value.start ?? null) : internalStart
  const currentEnd = isControlled ? (value.end ?? null) : internalEnd

  const isDisabled = disabled || forceState === 'disabled'
  const isActive = forceState === 'active' || forceState === 'focus' || (!forceState && isOpen)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      const target = e.target as Node
      if (!containerRef.current?.contains(target) && !popupRef.current?.contains(target)) {
        setIsOpen(false)
        setSelecting('start')
        setHoverDate(null)
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleOutsideClick)
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
      if (!isControlled) {
        setInternalStart(pendingStart)
        setInternalEnd(pendingEnd)
      }
      onChange?.({ start: pendingStart, end: pendingEnd })
    }
    setIsOpen(false)
  }

  function handleCancel() {
    setIsOpen(false)
    setSelecting('start')
    setHoverDate(null)
  }

  function handleToggle() {
    if (isDisabled || !!forceState) return
    if (!isOpen) {
      setPendingStart(currentStart)
      setPendingEnd(currentEnd)
      setSelecting('start')
    }
    setIsOpen((o) => !o)
  }

  const rootCls = [styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '']
    .filter(Boolean)
    .join(' ')

  const wrapperStateAttr = forceState && forceState !== 'disabled' ? forceState : undefined

  const wrapperCls = [styles.inputWrapper, isActive ? styles.isActive : '']
    .filter(Boolean)
    .join(' ')

  const startText = formatDate(currentStart)
  const endText = formatDate(currentEnd)

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

      <button
        id={inputId}
        ref={wrapperRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-controls={popupId}
        className={wrapperCls}
        data-state={wrapperStateAttr}
        onClick={handleToggle}
        disabled={isDisabled}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsOpen(false)
            setSelecting('start')
          }
        }}
      >
        <span className={cx(styles.dateText, startText ? styles.filled : '')}>
          {startText || 'dd/mm/aa'}
        </span>

        <span className={`material-symbols-rounded icon-sm ${styles.arrowIcon}`} aria-hidden="true">
          east
        </span>

        <span className={cx(styles.dateText, endText ? styles.filled : '')}>
          {endText || 'dd/mm/aa'}
        </span>

        <span
          className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.calendarIcon}`}
          aria-hidden="true"
        >
          calendar_today
        </span>
      </button>

      {isOpen &&
        !forceState &&
        popupPos &&
        createPortal(
          <div
            id={popupId}
            ref={popupRef}
            className={styles.calendarPopup}
            style={{ position: 'fixed', top: popupPos.top, left: popupPos.left }}
            role="dialog"
            aria-modal="false"
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
