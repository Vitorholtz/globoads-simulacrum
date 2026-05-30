import type { BorderWidthToken } from '../../tokens/borderWidth'
import styles from './BorderWidthRow.module.css'

interface BorderWidthRowProps {
  token: BorderWidthToken
}

export default function BorderWidthRow({ token }: BorderWidthRowProps) {
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
        <div
          className={`${styles.box} ${token.valuePx === 0 ? styles.boxNone : ''}`}
          style={token.valuePx > 0 ? { borderWidth: `var(${token.variable})` } : undefined}
        />
      </div>
    </div>
  )
}
