import type { FocusToken } from '../../tokens/focus'
import styles from './FocusCard.module.css'

interface FocusCardProps {
  token: FocusToken
}

export default function FocusCard({ token }: FocusCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <div className={styles.element} style={{ boxShadow: `var(${token.variable})` }} />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={`type-title-sm ${styles.name}`}>{token.name}</span>
          <span className={`type-caption-sm ${styles.useCase}`}>{token.useCase}</span>
        </div>
        <span className={`type-caption-sm ${styles.variable}`}>{token.variable}</span>
        <span className={`type-caption-sm ${styles.value}`}>{token.cssValue}</span>
      </div>
    </div>
  )
}
