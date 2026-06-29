import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './StateMatrix.module.css'

interface ColumnLike {
  id: string
  label: string
}

interface RowLike {
  id?: string
  label: string
}

interface StateMatrixProps<C extends ColumnLike, R extends RowLike> {
  columns: C[]
  rows: R[]
  renderCell: (row: R, col: C) => ReactNode
  getCellClassName?: (row: R, col: C) => string | undefined
  align?: 'center' | 'start'
  cellPad?: 'md' | 'sm'
  overflow?: 'hidden' | 'visible'
  group?: boolean
  header?: { name: ReactNode; description?: ReactNode }
  className?: string
}

export default function StateMatrix<C extends ColumnLike, R extends RowLike>({
  columns,
  rows,
  renderCell,
  getCellClassName,
  align = 'center',
  cellPad = 'md',
  overflow = 'hidden',
  group = false,
  header,
  className,
}: StateMatrixProps<C, R>) {
  const cls = cx(
    styles.container,
    align === 'start' ? styles.alignStart : '',
    cellPad === 'sm' ? styles.cellPadSm : '',
    overflow === 'visible' ? styles.overflowVisible : '',
    group ? styles.group : '',
    className ?? ''
  )

  const table = (
    <div className={cls}>
      <div className={styles.headerRow}>
        <div className={styles.headerSpacer} />
        {columns.map((col) => (
          <div key={col.id} className={`type-caption-sm ${styles.cellLabel}`}>
            {col.label}
          </div>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row.id ?? row.label} className={styles.row}>
          <div className={styles.stateLabel}>
            <span className={`type-caption-sm ${styles.stateName}`}>{row.label}</span>
          </div>
          <div className={styles.cells}>
            {columns.map((col) => {
              const extra = getCellClassName?.(row, col)
              return (
                <div key={col.id} className={cx(styles.cell, extra ?? '')}>
                  {renderCell(row, col)}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  if (!header) return table

  return (
    <div className={styles.wrapper}>
      <div className={styles.groupHeader}>
        <span className={`type-title-sm ${styles.groupHeaderName}`}>{header.name}</span>
        {header.description != null && (
          <span className={`type-body-sm ${styles.groupHeaderDesc}`}>— {header.description}</span>
        )}
      </div>
      {table}
    </div>
  )
}
