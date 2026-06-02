import type { EasingToken } from '../../tokens/motion'
import styles from './EasingCard.module.css'

interface EasingCardProps {
  token: EasingToken
}

export default function EasingCard({ token }: EasingCardProps) {
  return (
    <div
      className={styles.card}
      style={{ '--demo-easing': `var(${token.variable})` } as React.CSSProperties}
    >
      <div className={styles.preview}>
        <div className={styles.track}>
          <div className={styles.block} />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <code className={`type-caption-sm ${styles.variable}`}>{token.variable}</code>
          <span className={`type-title-sm ${styles.value}`}>{token.value}</span>
        </div>
        <p className={`type-body-sm ${styles.description}`}>{token.description}</p>
      </div>
    </div>
  )
}
