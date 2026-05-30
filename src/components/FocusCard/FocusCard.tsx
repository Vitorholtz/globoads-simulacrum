import type { FocusToken } from '../../tokens/focus'
import styles from './FocusCard.module.css'

interface FocusCardProps {
  token: FocusToken
}

export default function FocusCard({ token }: FocusCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <div
          className={styles.element}
          style={{ boxShadow: `var(${token.variable})` }}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.header}>
          <span className={`type-body-md ${styles.name}`}>{token.name}</span>
          <span className={`type-caption-md ${styles.useCase}`}>{token.useCase}</span>
        </div>
        <span className={`type-caption-md ${styles.value}`}>{token.cssValue}</span>
        <span className={`type-caption-md ${styles.variable}`}>{token.variable}</span>
      </div>
    </div>
  )
}
