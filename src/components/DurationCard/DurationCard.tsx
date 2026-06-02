import type { DurationToken } from '../../tokens/motion'
import styles from './DurationCard.module.css'

interface DurationCardProps {
  token: DurationToken
}

export default function DurationCard({ token }: DurationCardProps) {
  return (
    <div
      className={styles.card}
      style={{ '--demo-duration': `var(${token.variable})` } as React.CSSProperties}
    >
      <div className={styles.preview}>
        <div className={styles.track}>
          <div className={styles.block} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <code className={`type-caption-sm ${styles.variable}`}>{token.variable}</code>
          <span className={`type-title-sm ${styles.value}`}>{token.valueMs}ms</span>
        </div>
        <p className={`type-body-sm ${styles.description}`}>{token.description}</p>
      </div>
    </div>
  )
}
