import { useState } from 'react'
import styles from './Calendar.module.css'
import Button from '../Button/Button'
import type { CalendarSize } from '../../tokens/datePicker'

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
const MONTHS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

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

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  function isToday(day: number) {
    return today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day
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
      const [lo, hi] = rangeStart <= effectiveEnd ? [rangeStart, effectiveEnd] : [effectiveEnd, rangeStart]
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

  return (
    <div className={[styles.root, styles[size], className ?? ''].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <Button type="button" variant="tertiary" size="md" iconLeft="arrow_back" onClick={prevMonth} aria-label="Mês anterior" />
        <span className={`${size === 'sm' ? 'type-title-sm' : 'type-title-md'} ${styles.monthLabel}`}>
          {MONTHS_PT[viewMonth]}/{String(viewYear).slice(2)}
        </span>
        <Button type="button" variant="tertiary" size="md" iconLeft="arrow_forward" onClick={nextMonth} aria-label="Próximo mês" />
      </div>

      <div className={styles.weekdays}>
        {WEEKDAYS.map((d, i) => (
          <span key={i} className={`type-caption-md ${styles.weekday}`}>{d}</span>
        ))}
      </div>

      <div className={styles.daysGrid}>
        {cells.map((day, i) => {
          const rangeCellClass = day !== null ? getRangeCellClass(day) : ''
          return (
            <div key={i} className={[styles.dayCell, rangeCellClass].filter(Boolean).join(' ')}>
              {day !== null && (
                <button
                  type="button"
                  className={[
                    size === 'sm' ? 'type-caption-md' : 'type-caption-lg',
                    styles.day,
                    !isRangeMode && isSelected(day) ? styles.daySelected : '',
                    isRangeMode && isDayRangeEndpoint(day) ? styles.daySelected : '',
                    isRangeMode && isDayHoverEnd(day) ? styles.dayHoverEnd : '',
                    isToday(day) ? styles.dayToday : '',
                  ].filter(Boolean).join(' ')}
                  onClick={() => onChange?.(new Date(viewYear, viewMonth, day))}
                  onMouseEnter={() => isRangeMode && onHoverChange?.(new Date(viewYear, viewMonth, day))}
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

      {(onConfirm || onCancel) && (
        <div className={styles.footer}>
          {onCancel && (
            <Button variant="secondary" size="md" className={styles.footerBtn} onClick={onCancel}>
              Cancelar
            </Button>
          )}
          {onConfirm && (
            <Button variant="primary" size="md" className={styles.footerBtn} onClick={onConfirm} disabled={confirmDisabled}>
              Confirmar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
