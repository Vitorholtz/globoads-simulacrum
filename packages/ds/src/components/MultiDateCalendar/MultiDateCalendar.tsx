import { useState, useRef, useEffect } from 'react'
import Button from '../Button/Button'
import styles from './MultiDateCalendar.module.css'

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
const MONTHS_PT_FULL = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function toKey(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export interface MultiDateCalendarProps {
  label?: string
  value: Date[]
  onChange: (dates: Date[]) => void
}

export default function MultiDateCalendar({ label, value, onChange }: MultiDateCalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [focusedDay, setFocusedDay] = useState<number | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  const selectedKeys = new Set(value.map(toKey))

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const rovingDay = (() => {
    if (focusedDay !== null) return focusedDay
    const selectedInView = value.find(
      (d) => d.getFullYear() === viewYear && d.getMonth() === viewMonth
    )
    if (selectedInView) return selectedInView.getDate()
    if (today.getFullYear() === viewYear && today.getMonth() === viewMonth) return today.getDate()
    return 1
  })()

  useEffect(() => {
    if (focusedDay === null) return
    gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusedDay}"]`)?.focus()
  }, [focusedDay, viewMonth, viewYear])

  function toggleDay(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    const key = toKey(d)
    const next = selectedKeys.has(key)
      ? value.filter((v) => toKey(v) !== key)
      : [...value, d].sort((a, b) => a.getTime() - b.getTime())
    onChange(next)
  }

  function prevMonth() {
    setFocusedDay(null)
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    setFocusedDay(null)
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else setViewMonth((m) => m + 1)
  }

  function handleGridKeyDown(e: React.KeyboardEvent) {
    const arrowDelta: Partial<Record<string, number>> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
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

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return d < todayStart
  }

  return (
    <div className={styles.root}>
      {label && <p className={`type-title-sm ${styles.label}`}>{label}</p>}

      <div className={styles.calendar}>
        <div className={styles.header}>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            iconLeft="arrow_back"
            onClick={prevMonth}
            aria-label="Mês anterior"
          />
          <div className={styles.headerCenter}>
            <span className={`type-title-sm ${styles.monthLabel}`}>
              {MONTHS_PT[viewMonth]}/{String(viewYear).slice(2)}
            </span>
          </div>
          <Button
            type="button"
            variant="tertiary"
            size="md"
            iconLeft="arrow_forward"
            onClick={nextMonth}
            aria-label="Próximo mês"
          />
        </div>

        <div className={styles.weekdays}>
          {WEEKDAYS.map((d, i) => (
            <span key={i} className={`type-caption-md ${styles.weekday}`}>
              {d}
            </span>
          ))}
        </div>

        <div ref={gridRef} className={styles.daysGrid} onKeyDown={handleGridKeyDown}>
          {cells.map((day, i) => {
            if (day === null) return <div key={i} className={styles.dayCell} aria-hidden="true" />
            const key = toKey(new Date(viewYear, viewMonth, day))
            const selected = selectedKeys.has(key)
            const past = isPast(day)
            return (
              <div key={i} className={styles.dayCell}>
                <button
                  type="button"
                  data-day={day}
                  tabIndex={day === rovingDay ? 0 : -1}
                  className={[
                    'type-caption-md',
                    styles.day,
                    selected ? styles.daySelected : '',
                    isToday(day) ? styles.dayToday : '',
                    past ? styles.dayDisabled : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => !past && toggleDay(day)}
                  disabled={past}
                  aria-pressed={selected}
                  aria-label={`${day} de ${MONTHS_PT_FULL[viewMonth]} de ${viewYear}${selected ? ', selecionado' : ''}${past ? ', indisponível' : ''}`}
                >
                  {day}
                </button>
              </div>
            )
          })}
        </div>

        <div className={styles.footer}>
          {value.length === 0 ? (
            <span className={`type-caption-md ${styles.footerHint}`}>
              Clique nos dias para selecionar
            </span>
          ) : (
            <>
              <span className={`type-caption-md ${styles.footerCount}`}>
                {value.length} {value.length === 1 ? 'dia selecionado' : 'dias selecionados'}
              </span>
              <Button
                type="button"
                variant="tertiary"
                size="sm"
                iconLeft="remove_done"
                onClick={() => onChange([])}
              >
                Limpar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
