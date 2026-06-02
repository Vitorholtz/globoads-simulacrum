import type { ToastType } from '../../tokens/toast'
import styles from './Toast.module.css'

const ICON_MAP: Record<ToastType, string> = {
  neutral: 'info',
  success: 'check_circle',
  warning: 'warning',
  critical: 'error',
}

interface ToastProps {
  type?: ToastType
  title?: string
  description?: string
  /** Shows the close (×) button */
  closable?: boolean
  /** Callback fired when the user clicks the close button */
  onClose?: () => void
  className?: string
}

export default function Toast({
  type = 'neutral',
  title,
  description,
  closable = true,
  onClose,
  className,
}: ToastProps) {
  return (
    <div
      className={[styles.root, styles[type], closable && styles.hasClose, className]
        .filter(Boolean)
        .join(' ')}
      role="alert"
      aria-live="polite"
    >
      <div className={styles.iconWrap}>
        <span className={`material-symbols-rounded icon-md ${styles.icon}`} aria-hidden="true">
          {ICON_MAP[type]}
        </span>
      </div>

      <div className={styles.content}>
        {title && <p className={`type-title-sm ${styles.title}`}>{title}</p>}
        {description && <p className={`type-body-sm ${styles.description}`}>{description}</p>}
      </div>

      {closable && (
        <button
          type="button"
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Fechar notificação"
        >
          <span
            className={`material-symbols-rounded icon-md ${styles.closeIcon}`}
            aria-hidden="true"
          >
            close
          </span>
        </button>
      )}
    </div>
  )
}
