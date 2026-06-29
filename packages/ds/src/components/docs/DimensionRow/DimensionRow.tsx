import type { ReactNode } from 'react'
import DocBadge from '../DocBadge/DocBadge'
import styles from './DimensionRow.module.css'

interface DimensionToken {
  name: string
  variable: string
  valuePx: number
  valueRem: string
}

interface DimensionRowProps {
  token: DimensionToken
  children: ReactNode
}

export default function DimensionRow({ token, children }: DimensionRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={`type-title-sm ${styles.name}`}>{token.name}</span>
        <span className={`type-caption-md ${styles.value}`}>
          {token.valuePx === 0 ? '0' : `${token.valueRem} / ${token.valuePx}px`}
        </span>
      </div>
      <div className={styles.variable}>
        <DocBadge variant="accent" className="type-caption-sm font-code">
          {token.variable}
        </DocBadge>
      </div>
      <div className={styles.display}>{children}</div>
    </div>
  )
}
