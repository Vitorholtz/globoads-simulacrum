import type { SpacingToken } from '../../tokens/spacing'
import DimensionRow from '../DimensionRow/DimensionRow'
import styles from './SpacingRow.module.css'

interface SpacingRowProps {
  token: SpacingToken
}

export default function SpacingRow({ token }: SpacingRowProps) {
  return (
    <DimensionRow token={token} rowHeight={80} displayHeight={40} fill>
      {token.valuePx > 0 && (
        <div className={styles.bar} style={{ width: `var(${token.variable})` }} />
      )}
    </DimensionRow>
  )
}
