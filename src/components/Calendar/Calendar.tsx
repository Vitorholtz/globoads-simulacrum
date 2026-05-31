import { useState, useEffect, useRef } from 'react'
import styles from './Calendar.module.css'
import Button from '../Button/Button'
import type { CalendarSize } from '../../tokens/datePicker'
import { cx } from '../../utils/cx'

export interface CalendarProps {
  size?: CalendarSize
  value?: Date | null
  onChange?: (date: Date) => void
  rangeStart?: Date | null
  rangeEnd?: Date | null
  hoverDate?: Date | null
  onHoverChange?: (date: Date | null) => void
  onConfirm?: () => void
  onCancel?: () => void
  confirmDisabled?: boolean
  className?: string
}

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
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

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

type CalendarView = 'days' | 'years' | 'months'

export default function Calendar({
  size = 'md',
  value,
  onChange,
  rangeStart,
  rangeEnd,
  hoverDate,
  onHoverChange,
  onConfirm,
  onCancel,
  confirmDisabled,
  className,
}: CalendarProps) {
  const today = new Date()
  const initialDate = value ?? rangeStart ?? null
  const [viewYear, setViewYear] = useState(initialDate?.getFullYear() ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate?.getMonth() ?? today.getMonth())
  const [focusedDay, setFocusedDay] = useState<number | null>(null)
  const [view, setView] = useState<CalendarView>('days')
  const [yearPageStart, setYearPageStart] = useState(
    () => Math.floor((initialDate?.getFullYear() ?? today.getFullYear()) / 12) * 12
  )
  const gridRef = useRef<HTMLDivElement>(null)

  // Day that owns tabIndex=0 in the roving tabindex pattern
  const rovingDay = (() => {
    if (focusedDay !== null) return focusedDay
    if (value && value.getFullYear() === viewYear && value.getMonth() === viewMonth)
      return value.getDate()
    if (today.getFullYear() === viewYear && today.getMonth() === viewMonth)
      return today.getDate()
    return 1
  })()

  // Focus the roving day button after arrow-key navigation or month change
  useEffect(() => {
    if (focusedDay === null) return
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusedDay}"]`)?.focus()
  }, [focusedDay, viewMonth, viewYear])

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  function prevNav() {
    setFocusedDay(null)
    if (view === 'years') { setYearPageStart(s => s - 12); return }
    if (view === 'months') { setViewYear(y => y - 1); return }
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11) }
    else setViewMonth((m) => m - 1)
  }

  function nextNav() {
    setFocusedDay(null)
    if (view === 'years') { setYearPageStart(s => s + 12); return }
    if (view === 'months') { setViewYear(y => y + 1); return }
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0) }
    else setViewMonth((m) => m + 1)
  }

  function handleGridKeyDown(e: React.KeyboardEvent) {
    const arrowDelta: Partial<Record<string, number>> = {
      ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7,
    }
    const delta = arrowDelta[e.key]

    if (e.key === 'PageUp' || e.key === 'PageDown') {
      e.preventDefault()
      const sign = e.key === 'PageUp' ? -1 : 1
      const base = focusedDay ?? rovingDay
      const target = new Date(viewYear, viewMonth + sign, 1)
      const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate()
      setViewYear(target.getFullYear())
      setViewMonth(target.getMonth())
      setFocusedDay(Math.min(base, lastDay))
      return
    }

    if (delta === undefined) return
    e.preventDefault()
    const current = new Date(viewYear, viewMonth, focusedDay ?? rovingDay)
    current.setDate(current.getDate() + delta)
    if (current.getFullYear() !== viewYear || current.getMonth() !== viewMonth) {
      setViewYear(current.getFullYear())
      setViewMonth(current.getMonth())
    }
    setFocusedDay(current.getDate())
  }

  function isToday(day: number) {
    return (
      today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
    )
  }

  function isSelected(day: number) {
    return !!value && sameDay(value, new Date(viewYear, viewMonth, day))
  }

  const isRangeMode = rangeStart !== undefined

  function getRangeCellClass(day: number): string {
    if (!isRangeMode || !rangeStart) return ''
    const d = new Date(viewYear, viewMonth, day)

    if (sameDay(d, rangeStart)) return styles.rangeStart
    if (rangeEnd && sameDay(d, rangeEnd)) return styles.rangeEnd
    if (!rangeEnd && hoverDate && sameDay(d, hoverDate)) return styles.rangeHoverEnd

    const effectiveEnd = rangeEnd ?? hoverDate
    if (effectiveEnd) {
      const [lo, hi] =
        rangeStart <= effectiveEnd ? [rangeStart, effectiveEnd] : [effectiveEnd, rangeStart]
      if (d > lo && d < hi) return rangeEnd ? styles.inRange : styles.hoverInRange
    }

    return ''
  }

  function isDayRangeEndpoint(day: number) {
    if (!isRangeMode || !rangeStart) return false
    const d = new Date(viewYear, viewMonth, day)
    return sameDay(d, rangeStart) || (!!rangeEnd && sameDay(d, rangeEnd))
  }

  function isDayHoverEnd(day: number) {
    if (!isRangeMode || !!rangeEnd || !hoverDate) return false
    return sameDay(new Date(viewYear, viewMonth, day), hoverDate)
  }

  const prevLabel = view === 'years' ? 'Período anterior' : view === 'months' ? 'Ano anterior' : 'Mês anterior'
  const nextLabel = view === 'years' ? 'Próximo período' : view === 'months' ? 'Próximo ano' : 'Próximo mês'

  return (
    <div className={cx(styles.root, styles[size], className ?? '')}>
      <div className={styles.header}>
        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="arrow_back"
          onClick={prevNav}
          aria-label={prevLabel}
        />

        <div className={styles.headerCenter}>
          {view === 'days' && (
            <button
              type="button"
              className={styles.monthLabelBtn}
              onClick={() => { setYearPageStart(Math.floor(viewYear / 12) * 12); setView('years') }}
              aria-label="Selecionar ano e mês"
            >
              <span className={`${size === 'sm' ? 'type-title-sm' : 'type-title-md'} ${styles.monthLabel}`}>
                {MONTHS_PT[viewMonth]}/{String(viewYear).slice(2)}
              </span>
              <span className="material-symbols-rounded icon-sm" aria-hidden="true">keyboard_arrow_down</span>
            </button>
          )}
          {view === 'years' && (
            <span className={`${size === 'sm' ? 'type-title-sm' : 'type-title-md'} ${styles.monthLabel}`}>
              {yearPageStart}–{yearPageStart + 11}
            </span>
          )}
          {view === 'months' && (
            <button
              type="button"
              className={styles.monthLabelBtn}
              onClick={() => setView('years')}
              aria-label="Selecionar ano"
            >
              <span className={`${size === 'sm' ? 'type-title-sm' : 'type-title-md'} ${styles.monthLabel}`}>
                {viewYear}
              </span>
              <span className="material-symbols-rounded icon-sm" aria-hidden="true">keyboard_arrow_up</span>
            </button>
          )}
        </div>

        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="arrow_forward"
          onClick={nextNav}
          aria-label={nextLabel}
        />
      </div>

      {view === 'years' && (
        <div className={styles.yearMonthGrid}>
          {Array.from({ length: 12 }, (_, i) => yearPageStart + i).map(year => (
            <button
              key={year}
              type="button"
              className={cx(
                size === 'sm' ? 'type-body-sm' : 'type-body-md',
                styles.pickerCell,
                year === viewYear ? styles.pickerCellSelected : ''
              )}
              onClick={() => { setViewYear(year); setView('months') }}
              aria-label={String(year)}
              aria-pressed={year === viewYear}
            >
              {year}
            </button>
          ))}
        </div>
      )}

      {view === 'months' && (
        <div className={styles.yearMonthGrid}>
          {MONTHS_PT.map((month, i) => (
            <button
              key={i}
              type="button"
              className={cx(
                size === 'sm' ? 'type-body-sm' : 'type-body-md',
                styles.pickerCell,
                i === viewMonth ? styles.pickerCellSelected : ''
              )}
              onClick={() => { setViewMonth(i); setFocusedDay(null); setView('days') }}
              aria-label={`${month} de ${viewYear}`}
              aria-pressed={i === viewMonth}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {view === 'days' && (
        <>
          <div className={styles.weekdays}>
            {WEEKDAYS.map((d, i) => (
              <span key={i} className={`type-caption-md ${styles.weekday}`}>
                {d}
              </span>
            ))}
          </div>

          <div ref={gridRef} className={styles.daysGrid} onKeyDown={handleGridKeyDown}>
            {cells.map((day, i) => {
              const rangeCellClass = day !== null ? getRangeCellClass(day) : ''
              return (
                <div key={i} className={cx(styles.dayCell, rangeCellClass)}>
                  {day !== null && (
                    <button
                      type="button"
                      data-day={day}
                      tabIndex={day === rovingDay ? 0 : -1}
                      className={cx(
                        size === 'sm' ? 'type-caption-md' : 'type-caption-lg',
                        styles.day,
                        !isRangeMode && isSelected(day) ? styles.daySelected : '',
                        isRangeMode && isDayRangeEndpoint(day) ? styles.daySelected : '',
                        isRangeMode && isDayHoverEnd(day) ? styles.dayHoverEnd : '',
                        isToday(day) ? styles.dayToday : ''
                      )}
                      onClick={() => onChange?.(new Date(viewYear, viewMonth, day))}
                      onMouseEnter={() =>
                        isRangeMode && onHoverChange?.(new Date(viewYear, viewMonth, day))
                      }
                      onMouseLeave={() => isRangeMode && onHoverChange?.(null)}
                      aria-label={`${day} de ${MONTHS_PT[viewMonth]} de ${viewYear}`}
                      aria-pressed={!isRangeMode ? isSelected(day) : isDayRangeEndpoint(day)}
                    >
                      {day}
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {(onConfirm || onCancel) && (
        <div className={styles.footer}>
          {onCancel && (
            <Button variant="secondary" size="md" className={styles.footerBtn} onClick={onCancel}>
              Cancelar
            </Button>
          )}
          {onConfirm && (
            <Button
              variant="primary"
              size="md"
              className={styles.footerBtn}
              onClick={onConfirm}
              disabled={confirmDisabled}
            >
              Confirmar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
