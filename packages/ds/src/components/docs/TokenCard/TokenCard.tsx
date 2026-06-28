import type { CSSProperties, ReactNode } from 'react'
import styles from './TokenCard.module.css'

interface TokenCardProps {
  preview: ReactNode
  name: string
  subtitle?: string
  variable: string
  value: string
  description?: string
  style?: CSSProperties
  className?: string
}

export default function TokenCard({
  preview,
  name,
  subtitle,
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
          {subtitle && <span className={`type-caption-sm ${styles.subtitle}`}>{subtitle}</span>}
        </div>
        <code className={`type-caption-sm ${styles.variable}`}>{variable}</code>
        <span className={`type-caption-sm ${styles.value}`}>{value}</span>
        {description && <p className={`type-body-sm ${styles.description}`}>{description}</p>}
      </div>
    </div>
  )
}
