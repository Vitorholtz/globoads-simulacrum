import type { SpacingToken } from '../../tokens/spacing'
import styles from './SpacingRow.module.css'

interface SpacingRowProps {
  token: SpacingToken
}

export default function SpacingRow({ token }: SpacingRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.meta}>
        <span className={`type-body-md ${styles.name}`}>{token.name}</span>
        <span className={`type-caption-md ${styles.value}`}>
          {token.valuePx === 0 ? '0' : `${token.valueRem} / ${token.valuePx}px`}
        </span>
      </div>
      <div className={`type-caption-md ${styles.variable}`}>
        <span>{token.variable}</span>
      </div>
      <div className={styles.display}>
        {token.valuePx > 0 && (
          <div className={styles.bar} style={{ width: `var(${token.variable})` }} />
        )}
      </div>
    </div>
  )
}
