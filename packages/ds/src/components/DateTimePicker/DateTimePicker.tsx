import { useState, useRef, useEffect, useLayoutEffect, useId } from 'react'
import { createPortal } from 'react-dom'
import styles from './DateTimePicker.module.css'
import Calendar from '../Calendar/Calendar'
import TimePanel from '../TimePicker/TimePanel'
import Button from '../Button/Button'
import FieldLabel from '../FieldLabel/FieldLabel'
import FieldMessage from '../FieldMessage/FieldMessage'
import { cx } from '../../utils/cx'
import type { DateTimePickerSize, DateTimeValue } from '../../tokens/dateTimePicker'
import type { TimeValue } from '../../tokens/timePicker'

export type { DateTimeValue }

export interface DateTimePickerProps {
  size?: DateTimePickerSize
  label?: string
  /** Hides the label visually; it remains in the DOM for screen readers */
  showLabel?: boolean
  /** Appends "(opcional)" to the label */
  optional?: boolean
  descriptionText?: string
  helpText?: string
  errorMessage?: string
  value?: DateTimeValue | null
  defaultValue?: DateTimeValue | null
  onChange?: (value: DateTimeValue) => void
  disabled?: boolean
  readOnly?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'error' | 'disabled' | 'readonly'
  id?: string
  className?: string
}

type Step = 'date' | 'time'

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return ''
  return `${pad2(date.getDate())}/${pad2(date.getMonth() + 1)}/${date.getFullYear()}`
}

function formatTime(time: TimeValue | null | undefined): string {
  if (!time) return ''
  return `${pad2(time.hours)}:${pad2(time.minutes)}`
}

function applyDateMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 8)
  if (d.length <= 2) return d
  if (d.length <= 4) return `${d.slice(0, 2)}/${d.slice(2)}`
  return `${d.slice(0, 2)}/${d.slice(2, 4)}/${d.slice(4)}`
}

function applyTimeMask(value: string): string {
  const d = value.replace(/\D/g, '').slice(0, 4)
  if (d.length <= 2) return d
  return `${d.slice(0, 2)}:${d.slice(2)}`
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

function parseTimeString(text: string): TimeValue | null {
  if (text.length !== 5) return null
  const [hh, mm] = text.split(':')
  const h = parseInt(hh, 10)
  const m = parseInt(mm, 10)
  if (isNaN(h) || isNaN(m)) return null
  if (h < 0 || h > 23 || m < 0 || m > 59) return null
  return { hours: h, minutes: m }
}

const MONTHS_PT = [
  'jan',
  'fev',
  'mar',
  'abr',
  'mai',
  'jun',
  'jul',
  'ago',
  'set',
  'out',
  'nov',
  'dez',
]

const ICON_CLS: Record<DateTimePickerSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const INPUT_TYPE: Record<DateTimePickerSize, string> = {
  sm: 'type-body-sm',
  md: 'type-body-md',
  lg: 'type-body-md',
}

export default function DateTimePicker({
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
  readOnly,
  forceState,
  id,
  className,
}: DateTimePickerProps) {
  const generatedId = useId()
  const dateInputId = id ?? generatedId
  const timeInputId = `${dateInputId}-time`
  const popupId = `${dateInputId}-popup`
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  const [internalDate, setInternalDate] = useState<Date | null>(defaultValue?.date ?? null)
  const [internalTime, setInternalTime] = useState<TimeValue | null>(defaultValue?.time ?? null)
  const [dateInputText, setDateInputText] = useState<string>(() =>
    formatDate(value?.date ?? defaultValue?.date ?? null)
  )
  const [timeInputText, setTimeInputText] = useState<string>(() =>
    formatTime(value?.time ?? defaultValue?.time ?? null)
  )
  const [step, setStep] = useState<Step>('date')
  const [pendingDate, setPendingDate] = useState<Date | null>(null)
  const [pendingTime, setPendingTime] = useState<TimeValue>({ hours: 0, minutes: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [popupPos, setPopupPos] = useState<{ top: number; left: number } | null>(null)

  const isControlled = value !== undefined
  const currentDate = isControlled ? (value?.date ?? null) : internalDate
  const currentTime = isControlled ? (value?.time ?? null) : internalTime

  const [prevControlledValue, setPrevControlledValue] = useState(value)
  if (isControlled && value !== prevControlledValue) {
    setPrevControlledValue(value)
    setDateInputText(formatDate(value?.date ?? null))
    setTimeInputText(formatTime(value?.time ?? null))
  }

  const isDisabled = disabled || forceState === 'disabled'
  const isReadOnly = !isDisabled && (readOnly || forceState === 'readonly')
  const hasTypedError =
    (dateInputText.length === 10 && !parseDateString(dateInputText)) ||
    (timeInputText.length === 5 && !parseTimeString(timeInputText))
  const hasError = forceState === 'error' || hasTypedError || (!!errorMessage && !forceState)
  const displayError = hasTypedError && !errorMessage ? 'Data ou horário inválidos.' : errorMessage
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

  // Move focus into the panel when it opens or when the step changes.
  // requestAnimationFrame defers until after the popup/step is in the DOM
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
  }, [isOpen, isLeaving, step])

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

  function handleDateInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyDateMask(e.target.value)
    setDateInputText(masked)
    const parsed = parseDateString(masked)
    if (parsed) {
      if (!isControlled) setInternalDate(parsed)
      const time = parseTimeString(timeInputText) ?? currentTime
      if (time) onChange?.({ date: parsed, time })
    } else if (masked === '') {
      if (!isControlled) setInternalDate(null)
    }
  }

  function handleTimeInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyTimeMask(e.target.value)
    setTimeInputText(masked)
    const parsed = parseTimeString(masked)
    if (parsed) {
      if (!isControlled) setInternalTime(parsed)
      const date = parseDateString(dateInputText) ?? currentDate
      if (date) onChange?.({ date, time: parsed })
    } else if (masked === '') {
      if (!isControlled) setInternalTime(null)
    }
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
      setPendingDate(parseDateString(dateInputText) ?? currentDate ?? null)
      setPendingTime(parseTimeString(timeInputText) ?? currentTime ?? { hours: 0, minutes: 0 })
      setStep('date')
      setIsOpen(true)
    }
  }

  function handleDateConfirm() {
    if (!pendingDate) return
    setStep('time')
  }

  function handleTimeConfirm() {
    if (!pendingDate) return
    setDateInputText(formatDate(pendingDate))
    setTimeInputText(formatTime(pendingTime))
    if (!isControlled) {
      setInternalDate(pendingDate)
      setInternalTime(pendingTime)
    }
    onChange?.({ date: pendingDate, time: pendingTime })
    setIsLeaving(true)
  }

  function handleCancel() {
    setIsLeaving(true)
  }

  const escKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsLeaving(true)
  }

  const rootCls = cx(styles.root, styles[size], isDisabled ? styles.disabled : '', className ?? '')

  const wrapperStateAttr = isReadOnly
    ? 'readonly'
    : forceState && forceState !== 'disabled'
      ? forceState
      : undefined

  const wrapperCls = cx(
    styles.inputWrapper,
    hasError ? styles.hasError : '',
    isActive && !hasError ? styles.isActive : ''
  )

  return (
    <div className={rootCls} ref={containerRef}>
      <FieldLabel
        showLabel={showLabel}
        label={label}
        optional={optional}
        readOnly={isReadOnly}
        descriptionText={descriptionText}
        htmlFor={dateInputId}
      />

      <div ref={wrapperRef} className={wrapperCls} data-state={wrapperStateAttr}>
        <input
          id={dateInputId}
          type="text"
          className={cx(INPUT_TYPE[size], styles.inputField)}
          inputMode="numeric"
          maxLength={10}
          placeholder="DD/MM/AAAA"
          value={dateInputText}
          onChange={handleDateInputChange}
          disabled={isDisabled}
          readOnly={!!forceState || isReadOnly}
          tabIndex={forceState ? -1 : undefined}
          aria-invalid={hasError || undefined}
          onKeyDown={escKeyDown}
        />

        <span
          className={cx('material-symbols-rounded', 'icon-sm', styles.arrowIcon)}
          aria-hidden="true"
        >
          east
        </span>

        <input
          id={timeInputId}
          type="text"
          className={cx(INPUT_TYPE[size], styles.inputField)}
          inputMode="numeric"
          maxLength={5}
          placeholder="HH:MM"
          aria-label="Horário"
          value={timeInputText}
          onChange={handleTimeInputChange}
          disabled={isDisabled}
          readOnly={!!forceState || isReadOnly}
          tabIndex={forceState ? -1 : undefined}
          aria-invalid={hasError || undefined}
          onKeyDown={escKeyDown}
        />

        {hasError && (
          <span
            className={cx('material-symbols-rounded', ICON_CLS[size], styles.errorIcon)}
            aria-hidden="true"
          >
            error
          </span>
        )}

        {!isReadOnly && (
          <button
            ref={toggleBtnRef}
            type="button"
            className={styles.toggleBtn}
            onClick={handleToggle}
            disabled={isDisabled || !!forceState}
            tabIndex={forceState ? -1 : undefined}
            aria-expanded={isOpen && !isLeaving}
            aria-haspopup="dialog"
            aria-controls={isOpen && !isLeaving ? popupId : undefined}
            aria-label="Abrir seletor de data e horário"
          >
            <span
              className={cx(
                'material-symbols-rounded',
                ICON_CLS[size],
                hasError ? styles.errorToggleIcon : styles.toggleIcon
              )}
              aria-hidden="true"
            >
              event
            </span>
          </button>
        )}
      </div>

      {(isOpen || isLeaving) &&
        !forceState &&
        popupPos &&
        createPortal(
          <div
            id={popupId}
            ref={popupRef}
            role="dialog"
            aria-modal="false"
            aria-label="Selecionar data e horário"
            className={cx(styles.popup, isLeaving ? styles.popupLeaving : '')}
            style={{ position: 'fixed', top: popupPos.top, left: popupPos.left }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsLeaving(true)
            }}
            onAnimationEnd={() => {
              if (isLeaving) {
                setIsLeaving(false)
                setIsOpen(false)
                toggleBtnRef.current?.focus()
              }
            }}
          >
            {step === 'time' && (
              <div className={styles.popupHeader}>
                <Button
                  type="button"
                  variant="tertiary"
                  size="md"
                  iconLeft="arrow_back"
                  onClick={() => setStep('date')}
                  aria-label="Voltar para a data"
                  className={styles.popupBackBtn}
                />
                {pendingDate && (
                  <span className={cx('type-caption-md', styles.popupStep)}>
                    {`${pendingDate.getDate()} de ${MONTHS_PT[pendingDate.getMonth()]}/ ${pendingDate.getFullYear()}`}
                  </span>
                )}
              </div>
            )}

            {step === 'date' && (
              <Calendar
                size="sm"
                value={pendingDate ?? undefined}
                onChange={(date) => setPendingDate(date)}
                onConfirm={handleDateConfirm}
                onCancel={handleCancel}
                confirmDisabled={!pendingDate}
              />
            )}

            {step === 'time' && (
              <TimePanel
                value={pendingTime}
                onChange={(time) => setPendingTime(time)}
                onConfirm={handleTimeConfirm}
                onCancel={handleCancel}
              />
            )}
          </div>,
          document.body
        )}

      <FieldMessage helpText={helpText} errorMessage={displayError} hasError={hasError} />
    </div>
  )
}
