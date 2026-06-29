import type { ReactNode } from 'react'
import DocBadge from '../DocBadge/DocBadge'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  preview?: ReactNode
  title: string
  description?: string
  badge?: string
  previewPad?: 'sm' | 'md' | 'lg'
  previewBg?: 'primary' | 'secondary'
}

const padClass: Record<NonNullable<DemoCardProps['previewPad']>, string> = {
  sm: styles.previewPadSm,
  md: styles.previewPadMd,
  lg: styles.previewPadLg,
}

export default function DemoCard({
  preview,
  title,
  description,
  badge,
  previewPad = 'md',
  previewBg = 'secondary',
}: DemoCardProps) {
  return (
    <div className={styles.card}>
      {preview != null && (
        <div
          className={`${styles.preview} ${padClass[previewPad]} ${previewBg === 'primary' ? styles.previewBgPrimary : ''}`}
        >
          {preview}
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={`type-title-sm ${styles.title}`}>{title}</span>
          {badge && <DocBadge className="type-caption-sm">{badge}</DocBadge>}
        </div>
        {description && <span className={`type-body-sm ${styles.description}`}>{description}</span>}
      </div>
    </div>
  )
}
