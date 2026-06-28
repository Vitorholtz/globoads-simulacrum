import type { ReactNode } from 'react'
import styles from './ShowcaseList.module.css'

export interface ShowcaseRow {
  id: string
  label: string
  badge?: string
  badgeVariant?: 'default' | 'warning'
  description: string
  specs?: ReactNode
}

interface ShowcaseListProps {
  rows: ShowcaseRow[]
  previewWidth?: number
  renderPreview: (row: ShowcaseRow) => ReactNode
}

export default function ShowcaseList({
  rows,
  previewWidth = 240,
  renderPreview,
}: ShowcaseListProps) {
  return (
    <div className={styles.container}>
      {rows.map((row) => (
        <div key={row.id} className={styles.row}>
          <div className={styles.preview} style={{ width: previewWidth }}>
            {renderPreview(row)}
          </div>
          <div className={styles.meta}>
            <div className={styles.labelRow}>
              <span className={`type-body-sm ${styles.label}`}>{row.label}</span>
              {row.badge && (
                <span
                  className={`type-caption-sm ${row.badgeVariant === 'warning' ? styles.badgeWarning : styles.badge}`}
                >
                  {row.badge}
                </span>
              )}
            </div>
            <span className={`type-body-sm ${styles.description}`}>{row.description}</span>
          </div>
          {row.specs && <div className={`type-caption-sm ${styles.specs}`}>{row.specs}</div>}
        </div>
      ))}
    </div>
  )
}
