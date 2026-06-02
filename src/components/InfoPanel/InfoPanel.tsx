import type { InfoPanelType } from '../../tokens/infoPanel'
import { cx } from '../../utils/cx'
import styles from './InfoPanel.module.css'

const ICON_MAP: Record<InfoPanelType, string> = {
  neutral: 'info',
  success: 'check_circle',
  warning: 'warning',
  critical: 'error',
}

interface InfoPanelProps {
  type?: InfoPanelType
  title?: string
  description?: string
  className?: string
}

export default function InfoPanel({
  type = 'neutral',
  title,
  description,
  className,
}: InfoPanelProps) {
  return (
    <div className={cx(styles.root, styles[type], className)} role="note">
      <span className={`material-symbols-rounded icon-lg ${styles.icon}`} aria-hidden="true">
        {ICON_MAP[type]}
      </span>
      <div className={styles.content}>
        {title && <p className={`type-title-sm`}>{title}</p>}
        {description && <p className={`type-body-sm ${styles.description}`}>{description}</p>}
      </div>
    </div>
  )
}
