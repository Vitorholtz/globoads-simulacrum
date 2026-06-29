import type { CSSProperties, ReactNode } from 'react'
import DocBadge from '../DocBadge/DocBadge'
import styles from './TokenCard.module.css'

interface TokenCardProps {
  preview: ReactNode
  name: string
  variable: string
  value: string
  description?: string
  style?: CSSProperties
  className?: string
}

export default function TokenCard({
  preview,
  name,
  variable,
  value,
  description,
  style,
  className,
}: TokenCardProps) {
  const cls = [styles.card, className].filter(Boolean).join(' ')

  return (
    <div className={cls} style={style}>
      <div className={styles.preview}>{preview}</div>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={`type-title-sm ${styles.name}`}>{name}</span>
          <DocBadge variant="accent" className="type-caption-sm font-code">
            {variable}
          </DocBadge>
        </div>
        <span className={`type-caption-sm ${styles.value}`}>{value}</span>
        {description && <p className={`type-body-sm ${styles.description}`}>{description}</p>}
      </div>
    </div>
  )
}
