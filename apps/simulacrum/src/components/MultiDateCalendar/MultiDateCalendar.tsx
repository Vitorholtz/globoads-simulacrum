import { useState } from 'react'
import { Button, Tooltip } from '@globo-ads/ds'
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

interface MultiDateCalendarProps {
  label?: string
  value: Date[]
  onChange: (dates: Date[]) => void
}

export default function MultiDateCalendar({ label, value, onChange }: MultiDateCalendarProps) {
  const today = new Date()
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [viewMonth, setViewMonth] = useState(today.getMonth())

  const selectedKeys = new Set(value.map(toKey))

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDay = new Date(viewYear, viewMonth, 1).getDay()

  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  function toggleDay(day: number) {
    const d = new Date(viewYear, viewMonth, day)
    const key = toKey(d)
    const next = selectedKeys.has(key)
      ? value.filter((v) => toKey(v) !== key)
      : [...value, d].sort((a, b) => a.getTime() - b.getTime())
    onChange(next)
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewYear((y) => y - 1)
      setViewMonth(11)
    } else setViewMonth((m) => m - 1)
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1)
      setViewMonth(0)
    } else setViewMonth((m) => m + 1)
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

        <div className={styles.daysGrid}>
          {cells.map((day, i) => {
            if (day === null) return <div key={i} className={styles.dayCell} aria-hidden="true" />
            const key = toKey(new Date(viewYear, viewMonth, day))
            const selected = selectedKeys.has(key)
            const past = isPast(day)
            return (
              <div key={i} className={styles.dayCell}>
                <button
                  type="button"
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
              <Tooltip text="Limpar datas" position="up" align="end">
                <Button
                  type="button"
                  variant="tertiary"
                  size="sm"
                  iconLeft="cleaning_services"
                  onClick={() => onChange([])}
                  aria-label="Limpar datas"
                />
              </Tooltip>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
