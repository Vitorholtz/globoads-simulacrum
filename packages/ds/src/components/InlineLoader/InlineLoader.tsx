import type {
  InlineLoaderType,
  InlineLoaderSize,
  InlineLoaderColor,
} from '../../tokens/inlineLoader'
import { cx } from '../../utils/cx'
import styles from './InlineLoader.module.css'

export type { InlineLoaderType, InlineLoaderSize, InlineLoaderColor }

interface InlineLoaderProps {
  type: InlineLoaderType
  size?: InlineLoaderSize
  color?: InlineLoaderColor
  /** Screen reader aria-label; also rendered as visible text in the "ellipsis" variant */
  label?: string
  className?: string
}

const SIZE_PX: Record<InlineLoaderSize, number> = { sm: 16, md: 20, lg: 24 }
const BORDER_WIDTH: Record<InlineLoaderSize, string> = { sm: '1.5px', md: '2px', lg: '2px' }
const ELLIPSIS_FONT_SIZE: Record<InlineLoaderSize, number> = { sm: 12, md: 14, lg: 16 }
const DOT_SIZE: Record<InlineLoaderSize, number> = { sm: 4, md: 5, lg: 6 }

const COLOR_VAR: Record<InlineLoaderColor, string> = {
  primary: 'var(--color-fill-primary)',
  secondary: 'var(--color-fill-secondary)',
  tertiary: 'var(--color-fill-tertiary)',
  accent: 'var(--color-fill-accent)',
  success: 'var(--color-fill-success)',
  warning: 'var(--color-fill-warning)',
  critical: 'var(--color-fill-critical)',
  inverse: 'var(--color-fill-inverse)',
}

export default function InlineLoader({
  type,
  size = 'sm',
  color = 'primary',
  label = 'Carregando',
  className,
}: InlineLoaderProps) {
  const sizePx = SIZE_PX[size]
  const dotSize = DOT_SIZE[size]

  return (
    <span
      className={cx(styles.loader, className)}
      style={{ color: COLOR_VAR[color] }}
      role="status"
      aria-label={label}
    >
      {type === 'spinner' && (
        <span
          className={styles.spinner}
          style={{ width: sizePx, height: sizePx, borderWidth: BORDER_WIDTH[size] }}
        />
      )}

      {type === 'rippler' && (
        <span className={styles.rippler} style={{ width: sizePx, height: sizePx }}>
          <span className={styles.ripplerDot} style={{ width: dotSize, height: dotSize }} />
          <span
            className={`${styles.ripplerRing} ${styles.ring1}`}
            style={{
              width: dotSize,
              height: dotSize,
              marginTop: -dotSize / 2,
              marginLeft: -dotSize / 2,
            }}
          />
          <span
            className={`${styles.ripplerRing} ${styles.ring2}`}
            style={{
              width: dotSize,
              height: dotSize,
              marginTop: -dotSize / 2,
              marginLeft: -dotSize / 2,
            }}
          />
        </span>
      )}

      {type === 'sparkle' && (
        <span className={styles.sparkle} style={{ width: sizePx, height: sizePx }}>
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M12 0L13.2 9.88L24 12L13.2 14.12L12 24L10.8 14.12L0 12L10.8 9.88L12 0Z" />
          </svg>
        </span>
      )}

      {type === 'ellipsis' && (
        <span
          className={styles.ellipsis}
          style={{ fontSize: ELLIPSIS_FONT_SIZE[size] }}
          aria-hidden="true"
        >
          {label}
          <span className={`${styles.dot} ${styles.dot1}`}>.</span>
          <span className={`${styles.dot} ${styles.dot2}`}>.</span>
          <span className={`${styles.dot} ${styles.dot3}`}>.</span>
        </span>
      )}
    </span>
  )
}
