import { cx } from '../../utils/cx'
import styles from './ChipInput.module.css'
import type { ChipInputStyle } from '../../tokens/chipInput'
import Avatar from '../Avatar/Avatar'

export type { ChipInputStyle }

export interface ChipInputProps {
  label?: string
  style?: ChipInputStyle
  /** Icon name (Material Symbol) — used when style='icon' */
  icon?: string
  onRemove?: () => void
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'dragged' | 'disabled'
  className?: string
}

export default function ChipInput({
  label = 'Chip',
  style = 'default',
  icon = 'label',
  onRemove,
  forceState,
  className,
}: ChipInputProps) {
  const cls = cx(styles.chip, styles[style], className ?? '')

  return (
    <div className={cls} data-state={forceState}>
      {style === 'person' && <Avatar size="xs" variant="placeholder" aria-hidden="true" />}

      {style === 'icon' && (
        <span className={`material-symbols-rounded icon-sm ${styles.leadIcon}`} aria-hidden="true">
          {icon}
        </span>
      )}

      <span className={`type-caption-md ${styles.label}`}>{label}</span>

      <button
        className={styles.closeBtn}
        onClick={onRemove}
        aria-label="Remover"
        tabIndex={forceState === 'disabled' ? -1 : 0}
      >
        <span className={`material-symbols-rounded icon-sm ${styles.closeIcon}`} aria-hidden="true">
          close
        </span>
      </button>
    </div>
  )
}
