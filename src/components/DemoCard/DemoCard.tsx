import type { ReactNode } from 'react'
import styles from './DemoCard.module.css'

interface DemoCardProps {
  preview: ReactNode
  title: string
  description?: string
  badge?: string
  previewPad?: 'sm' | 'md' | 'lg'
  align?: 'center' | 'stretch'
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
  align = 'center',
}: DemoCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={`${styles.preview} ${padClass[previewPad]} ${align === 'stretch' ? styles.previewStretch : ''}`}
      >
        {preview}
      </div>
      <div className={styles.body}>
        <div className={styles.titleRow}>
          <span className={`type-title-sm ${styles.title}`}>{title}</span>
          {badge && <span className={`type-caption-sm ${styles.badge}`}>{badge}</span>}
        </div>
        {description && <span className={`type-body-sm ${styles.description}`}>{description}</span>}
      </div>
    </div>
  )
}
