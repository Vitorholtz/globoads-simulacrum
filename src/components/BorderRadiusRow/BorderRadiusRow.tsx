import styles from './BorderRadiusRow.module.css'
import type { BorderRadiusToken } from '../../tokens/borderRadius'

type BorderRadiusRowProps = {
  token: BorderRadiusToken
}

export default function BorderRadiusRow({ token }: BorderRadiusRowProps) {
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
          className={styles.box}
          style={{ borderRadius: `var(${token.variable})` }}
        />
      </div>
    </div>
  )
}
