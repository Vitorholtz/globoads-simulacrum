import DimensionRow from '../DimensionRow/DimensionRow'
import styles from './BorderRadiusRow.module.css'
import type { BorderRadiusToken } from '../../tokens/borderRadius'

type BorderRadiusRowProps = {
  token: BorderRadiusToken
}

export default function BorderRadiusRow({ token }: BorderRadiusRowProps) {
  return (
    <DimensionRow token={token} rowHeight={124} displayHeight={100}>
      <div className={styles.box} style={{ borderRadius: `var(${token.variable})` }} />
    </DimensionRow>
  )
}
