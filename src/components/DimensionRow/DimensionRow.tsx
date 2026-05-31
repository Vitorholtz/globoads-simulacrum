import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../utils/cx'
import styles from './DimensionRow.module.css'

/** Common shape shared by spacing / border-width / border-radius tokens. */
interface DimensionToken {
  name: string
  variable: string
  valuePx: number
  valueRem: string
}

interface DimensionRowProps {
  token: DimensionToken
  /** Row height in px (the demo panel grows with the value being shown). */
  rowHeight: number
  /** Demo-panel height in px. */
  displayHeight: number
  /** Left-align + clip the demo (spacing bar) instead of centering it (boxes). */
  fill?: boolean
  /** The visual demo for this token (bar, bordered box, rounded box…). */
  children: ReactNode
}

/**
 * One row of a foundation token table: name + value, CSS variable, and a demo
 * panel. Shared chrome behind SpacingRow / BorderWidthRow / BorderRadiusRow —
 * each passes its own demo as children.
 */
export default function DimensionRow({
  token,
  rowHeight,
  displayHeight,
  fill = false,
  children,
}: DimensionRowProps) {
  const style = {
    '--dim-row-h': `${rowHeight}px`,
    '--dim-display-h': `${displayHeight}px`,
  } as CSSProperties

  const displayCls = cx(styles.display, fill ? styles.displayFill : '')

  return (
    <div className={styles.row} style={style}>
      <div className={styles.meta}>
        <span className={`type-body-md ${styles.name}`}>{token.name}</span>
        <span className={`type-caption-md ${styles.value}`}>
          {token.valuePx === 0 ? '0' : `${token.valueRem} / ${token.valuePx}px`}
        </span>
      </div>
      <div className={`type-caption-md ${styles.variable}`}>
        <span>{token.variable}</span>
      </div>
      <div className={displayCls}>{children}</div>
    </div>
  )
}
