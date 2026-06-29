import type { ReactNode } from 'react'
import { cx } from '../../../utils/cx'
import styles from './DocTable.module.css'

export interface DocTableColumn {
  key: string
  label: string
}

interface DocTableProps {
  columns: DocTableColumn[]
  rows: Array<Record<string, ReactNode>>
  className?: string
}

/**
 * Tabela de documentação: container bordeado com cabeçalho e linhas, no mesmo
 * visual das demais docs (mesmas bordas, raio e superfícies do StateMatrix).
 * Genérica — cada célula aceita qualquer conteúdo (texto, `code`, badge).
 */
export default function DocTable({ columns, rows, className }: DocTableProps) {
  return (
    <div className={cx(styles.wrapper, className ?? '')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} scope="col" className={cx('type-caption-sm', styles.th)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={styles.tr}>
              {columns.map((col) => (
                <td key={col.key} className={cx('type-body-sm', styles.td)}>
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
