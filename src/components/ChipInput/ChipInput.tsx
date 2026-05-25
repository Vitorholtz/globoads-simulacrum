import styles from './ChipInput.module.css'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'
import type { ChipInputStyle } from '../../tokens/chipInput'

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

const ICON_STYLE = { fontVariationSettings: FVAR_OUTLINED_SM }

export default function ChipInput({
  label = 'Chip',
  style = 'default',
  icon = 'label',
  onRemove,
  forceState,
  className,
}: ChipInputProps) {
  const cls = [
    styles.chip,
    styles[style],
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      data-state={forceState}
    >
      {style === 'person' && (
        <div className={styles.avatar} aria-hidden="true">
          <span
            className={`material-symbols-rounded ${styles.avatarIcon}`}
            style={ICON_STYLE}
          >
            person
          </span>
        </div>
      )}

      {style === 'icon' && (
        <span
          className={`material-symbols-rounded ${styles.leadIcon}`}
          style={ICON_STYLE}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <span className={styles.label}>{label}</span>

      <button
        className={styles.closeBtn}
        onClick={onRemove}
        aria-label="Remover"
        tabIndex={forceState === 'disabled' ? -1 : 0}
      >
        <span
          className={`material-symbols-rounded ${styles.closeIcon}`}
          style={ICON_STYLE}
          aria-hidden="true"
        >
          close
        </span>
      </button>
    </div>
  )
}
