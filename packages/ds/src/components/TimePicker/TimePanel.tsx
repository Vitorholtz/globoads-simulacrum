import styles from './TimePanel.module.css'
import Button from '../Button/Button'
import { cx } from '../../utils/cx'
import type { TimeValue } from '../../tokens/timePicker'

export interface TimePanelProps {
  value: TimeValue
  onChange: (time: TimeValue) => void
  /** Fires when the user confirms their selection (confirm button click) */
  onConfirm?: () => void
  /** Fires when the user cancels without confirming */
  onCancel?: () => void
  className?: string
}

const HOUR_STEP = 1
const MINUTE_STEP = 10

function pad2(n: number): string {
  return String(n).padStart(2, '0')
}

export default function TimePanel({
  value,
  onChange,
  onConfirm,
  onCancel,
  className,
}: TimePanelProps) {
  function adjustHours(delta: number) {
    onChange({ ...value, hours: (value.hours + delta + 24) % 24 })
  }

  function adjustMinutes(delta: number) {
    onChange({ ...value, minutes: (value.minutes + delta + 60) % 60 })
  }

  return (
    <div className={cx(styles.root, className ?? '')}>
      <div className={styles.grid}>
        <span className={cx('type-caption-md', styles.label, styles.colHours, styles.rowLabel)}>
          Horas
        </span>
        <span className={cx('type-caption-md', styles.label, styles.colMinutes, styles.rowLabel)}>
          Minutos
        </span>

        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="keyboard_arrow_up"
          className={cx(styles.colHours, styles.rowUp)}
          onClick={() => adjustHours(HOUR_STEP)}
          aria-label="Aumentar horas"
        />
        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="keyboard_arrow_up"
          className={cx(styles.colMinutes, styles.rowUp)}
          onClick={() => adjustMinutes(MINUTE_STEP)}
          aria-label="Aumentar minutos"
        />

        <span
          className={cx('type-display-sm', styles.value, styles.colHours, styles.rowValue)}
          role="status"
          aria-label={`Horas: ${pad2(value.hours)}`}
        >
          {pad2(value.hours)}
        </span>
        <span className={cx('type-display-sm', styles.separator)} aria-hidden="true">
          :
        </span>
        <span
          className={cx('type-display-sm', styles.value, styles.colMinutes, styles.rowValue)}
          role="status"
          aria-label={`Minutos: ${pad2(value.minutes)}`}
        >
          {pad2(value.minutes)}
        </span>

        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="keyboard_arrow_down"
          className={cx(styles.colHours, styles.rowDown)}
          onClick={() => adjustHours(-HOUR_STEP)}
          aria-label="Diminuir horas"
        />
        <Button
          type="button"
          variant="tertiary"
          size="md"
          iconLeft="keyboard_arrow_down"
          className={cx(styles.colMinutes, styles.rowDown)}
          onClick={() => adjustMinutes(-MINUTE_STEP)}
          aria-label="Diminuir minutos"
        />
      </div>

      {(onConfirm || onCancel) && (
        <div className={styles.footer}>
          {onCancel && (
            <Button variant="secondary" size="md" className={styles.footerBtn} onClick={onCancel}>
              Cancelar
            </Button>
          )}
          {onConfirm && (
            <Button variant="primary" size="md" className={styles.footerBtn} onClick={onConfirm}>
              Confirmar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
