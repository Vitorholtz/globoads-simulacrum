import type { CSSProperties, ReactNode } from 'react'
import styles from './StateMatrix.module.css'

/** Minimal shape a column needs; extra fields are passed through to renderCell. */
interface ColumnLike {
  id: string
  label: string
}
/** Minimal shape a row (state) needs; extra fields are passed through to renderCell. */
interface RowLike {
  id?: string
  label: string
}

interface StateMatrixProps<C extends ColumnLike, R extends RowLike> {
  /** Column headers (e.g. "Vazio" / "Preenchido"). */
  columns: C[]
  /** Rows — one per component state. */
  rows: R[]
  /** Renders the demo content for a single state×column cell. */
  renderCell: (row: R, col: C) => ReactNode
  /** Optional extra class on a cell wrapper (e.g. extra space under an open dropdown). */
  getCellClassName?: (row: R, col: C) => string | undefined
  /** Width of the state-label / header-spacer column. Default 100. */
  labelWidth?: number
  /** Vertical alignment of cell content. 'start' is used by multiline/dropdown demos. */
  align?: 'center' | 'start'
  /** Cell vertical padding scale: 'md' (default, spacing-300) or 'sm' (spacing-250). */
  cellPad?: 'md' | 'sm'
  /** Container overflow. 'visible' lets an open dropdown escape the container. */
  overflow?: 'hidden' | 'visible'
  className?: string
}

const PAD = { md: 'var(--spacing-300)', sm: 'var(--spacing-250)' }

/**
 * State-documentation matrix: a bordered grid of component states (rows) ×
 * variations (columns), each cell filled by `renderCell`. Replaces the
 * `matrixContainer/HeaderRow/Row/Cell` scaffold duplicated across input pages.
 *
 * Layout knobs (label width, alignment, padding, overflow) are driven by CSS
 * custom properties so every page reproduces its exact original look.
 */
export default function StateMatrix<C extends ColumnLike, R extends RowLike>({
  columns,
  rows,
  renderCell,
  getCellClassName,
  labelWidth = 100,
  align = 'center',
  cellPad = 'md',
  overflow = 'hidden',
  className,
}: StateMatrixProps<C, R>) {
  const style = {
    '--sm-label-width': `${labelWidth}px`,
    '--sm-align': align === 'start' ? 'flex-start' : 'center',
    '--sm-label-pt': align === 'start' ? PAD[cellPad] : '0',
    '--sm-cell-vpad': PAD[cellPad],
    '--sm-overflow': overflow,
  } as CSSProperties

  const cls = [styles.container, className ?? ''].filter(Boolean).join(' ')

  return (
    <div className={cls} style={style}>
      <div className={styles.headerRow}>
        <div className={styles.headerSpacer} />
        {columns.map((col) => (
          <div key={col.id} className={`type-caption-xs ${styles.cellLabel}`}>
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
                <div key={col.id} className={[styles.cell, extra ?? ''].filter(Boolean).join(' ')}>
                  {renderCell(row, col)}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
