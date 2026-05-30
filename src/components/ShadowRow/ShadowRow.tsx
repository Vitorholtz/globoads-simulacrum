import type { ShadowToken } from '../../tokens/shadow'
import styles from './ShadowRow.module.css'

interface ShadowRowProps {
  token: ShadowToken
}

export default function ShadowRow({ token }: ShadowRowProps) {
  return (
    <div className={styles.card}>
      <div className={styles.preview}>
        <div
          className={styles.circle}
          style={{ boxShadow: `var(${token.variable})` }}
        />
      </div>
      <div className={styles.info}>
        <span className={`type-body-md ${styles.name}`}>{token.name}</span>
        <span className={`type-caption-md ${styles.value}`}>{token.cssValue}</span>
        <span className={`type-caption-md ${styles.variable}`}>{token.variable}</span>
      </div>
    </div>
  )
}
