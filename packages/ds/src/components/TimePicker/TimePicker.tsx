import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './TimePicker.module.css'
import TimePanel from './TimePanel'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import type { TimePickerSize, TimeValue } from '../../tokens/timePicker'

export type { TimeValue }

export interface TimePickerProps {
  size?: TimePickerSize
  label?: string
  /** Hides the label visually; it remains in the DOM for screen readers */
  showLabel?: boolean
  /** Appends "(opcional)" to the label */
  optional?: boolean
  descriptionText?: string
  helpText?: string
  errorMessage?: string
  value?: TimeValue | null
  defaultValue?: TimeValue | null
  onChange?: (time: TimeValue | null) => void
  disabled?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'error' | 'disabled'
  id?: string
  className?: string
}

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatTime(time: TimeValue | null | undefined): string {
  if (!time) return ''
  return `${pad2(time.hours)}:${pad2(time.minutes)}`
}

function applyTimeMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}:${d.slice(2)}`
}

function parseTimeString(text: string): TimeValue | null {
  if (text.length !== 5) return null
  const [hh, mm] = text.split(':')
  const h = parseInt(hh, 10)
  const m = parseInt(mm, 10)
  if (isNaN(h) || isNaN(m)) return null
  if (h < 0 || h > 23 || m < 0 || m > 59) return null
  return { hours: h, minutes: m }
}

const ICON_CLS: Record<TimePickerSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const INPUT_TYPE: Record<TimePickerSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

export default function TimePicker({
  size = 'md',
  label = 'Label',
  showLabel = true,
  optional = false,
  descriptionText,
  helpText,
  errorMessage,
  value,
  defaultValue,
  onChange,
  disabled,
  forceState,
  id,
  className,
}: TimePickerProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const popupId = `${inputId}-popup`
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const clockBtnRef = useRef<HTMLButtonElement>(null)

  const [internalValue, setInternalValue] = useState<TimeValue | null>(defaultValue ?? null)
  const [inputText, setInputText] = useState<string>(() =>
    value !== undefined ? formatTime(value) : formatTime(defaultValue ?? null)
  )
  const [pendingTime, setPendingTime] = useState<TimeValue>({ hours: 0, minutes: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const [prevControlledValue, setPrevControlledValue] = useState(value)
  if (isControlled && value !== prevControlledValue) {
    setPrevControlledValue(value)
    setInputText(formatTime(value ?? null))
  }

  const isDisabled = disabled || forceState === 'disabled'
  const hasTypedError = inputText.length === 5 && !parseTimeString(inputText)
  const hasError = forceState === 'error' || hasTypedError || (!!errorMessage && !forceState)
  const displayError = hasTypedError && !errorMessage ? 'Horário inválido' : errorMessage
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

  // Move focus into the panel when it opens.
  // requestAnimationFrame defers until after the popup is in the DOM
  // (useLayoutEffect sets popupPos → re-render → popup mounts → then rAF fires).
  useEffect(() => {
    if (!isOpen || isLeaving) return
    const frame = requestAnimationFrame(() => {
      const firstFocusable = popupRef.current?.querySelector<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      firstFocusable?.focus()
    })
    return () => cancelAnimationFrame(frame)
  }, [isOpen, isLeaving])

  useLayoutEffect(() => {
    if (!isOpen || !wrapperRef.current) return
    function updatePos() {
      if (!wrapperRef.current) return
      const rect = wrapperRef.current.getBoundingClientRect()
      setPopupPos({ top: rect.bottom + 4, left: rect.left + rect.width / 2 })
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
    const masked = applyTimeMask(e.target.value)
    setInputText(masked)
    const parsed = parseTimeString(masked)
    if (parsed) {
      if (!isControlled) setInternalValue(parsed)
      onChange?.(parsed)
    } else if (masked === '') {
      if (!isControlled) setInternalValue(null)
      onChange?.(null)
    }
  }

  function handlePanelChange(time: TimeValue) {
    setPendingTime(time)
  }

  function handleConfirm() {
    setInputText(formatTime(pendingTime))
    if (!isControlled) setInternalValue(pendingTime)
    onChange?.(pendingTime)
    setIsLeaving(true)
  }

  function handleCancel() {
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
      const parsed = parseTimeString(inputText)
      setPendingTime(parsed ?? currentValue ?? { hours: 0, minutes: 0 })
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
      <FieldLabel
        showLabel={showLabel}
        label={label}
        optional={optional}
        descriptionText={descriptionText}
        htmlFor={inputId}
      />

      <div ref={wrapperRef} className={wrapperCls} data-state={wrapperStateAttr}>
        <input
          id={inputId}
          type="text"
          className={`${INPUT_TYPE[size]} ${styles.inputField}`}
          inputMode="numeric"
          maxLength={5}
          placeholder="HH:MM"
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
          ref={clockBtnRef}
          type="button"
          className={styles.clockBtn}
          onClick={handleToggle}
          disabled={isDisabled || !!forceState}
          tabIndex={forceState ? -1 : undefined}
          aria-expanded={isOpen && !isLeaving}
          aria-haspopup="dialog"
          aria-controls={isOpen && !isLeaving ? popupId : undefined}
          aria-label="Abrir seletor de horário"
        >
          <span
            className={`material-symbols-rounded ${ICON_CLS[size]} ${hasError ? styles.errorClockIcon : styles.clockIcon}`}
            aria-hidden="true"
          >
            schedule
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
            className={[styles.timePopup, isLeaving ? styles.timePopupLeaving : '']
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
                clockBtnRef.current?.focus()
              }
            }}
          >
            <TimePanel
              value={pendingTime}
              onChange={handlePanelChange}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>,
          document.body
        )}

      <FieldMessage helpText={helpText} errorMessage={displayError} hasError={hasError} />
    </div>
  )
}
