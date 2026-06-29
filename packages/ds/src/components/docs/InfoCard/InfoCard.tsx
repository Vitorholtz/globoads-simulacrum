import type { ReactNode } from 'react'
import DocBadge from '../DocBadge/DocBadge'
import styles from './InfoCard.module.css'

export interface SpecRow {
  label: string
  value: ReactNode
}

interface InfoCardProps {
  preview: ReactNode
  title?: string
  badge?: string
  description?: string
  specs?: SpecRow[]
  children?: ReactNode
  previewPosition?: 'left' | 'right'
}

export default function InfoCard({
  preview,
  title,
  badge,
  description,
  specs,
  children,
  previewPosition = 'left',
}: InfoCardProps) {
  const previewEl = <div className={styles.preview}>{preview}</div>

  const infoEl = (
    <div className={styles.info}>
      {title && (
        <div className={styles.header}>
          <h3 className={`type-title-md ${styles.title}`}>{title}</h3>
          {badge && <DocBadge className="type-caption-sm">{badge}</DocBadge>}
        </div>
      )}
      {description && <p className={`type-body-md ${styles.description}`}>{description}</p>}
      {specs && specs.length > 0 && (
        <div className={styles.specs}>
          {specs.map((row) => (
            <div key={row.label} className={styles.specRow}>
              <span className={`type-caption-sm ${styles.specLabel}`}>{row.label}</span>
              <span className={`type-body-sm ${styles.specValue}`}>{row.value}</span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  )

  return (
    <div className={styles.card}>
      {previewPosition === 'left' ? (
        <>
          {previewEl}
          {infoEl}
        </>
      ) : (
        <>
          {infoEl}
          {previewEl}
        </>
      )}
    </div>
  )
}
