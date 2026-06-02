import type { BorderWidthToken } from '../../../tokens/borderWidth'
import DimensionRow from '../DimensionRow/DimensionRow'
import styles from './BorderWidthRow.module.css'

interface BorderWidthRowProps {
  token: BorderWidthToken
}

export default function BorderWidthRow({ token }: BorderWidthRowProps) {
  return (
    <DimensionRow token={token} rowHeight={108} displayHeight={76}>
      <div
        className={`${styles.box} ${token.valuePx === 0 ? styles.boxNone : ''}`}
        style={token.valuePx > 0 ? { borderWidth: `var(${token.variable})` } : undefined}
      />
    </DimensionRow>
  )
}
