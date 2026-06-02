import { useState } from 'react'
import Button from '../Button/Button'
import styles from './Pagination.module.css'
import type { PaginationVariant } from '../../tokens/pagination'
import { cx } from '../../utils/cx'

export interface PaginationProps {
  variant?: PaginationVariant
  page: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
  onChange: (page: number) => void
  className?: string
}

function getPageWindow(page: number, totalPages: number): number[] {
  const size = Math.min(5, totalPages)
  let start = Math.max(1, page - Math.floor(size / 2))
  const end = Math.min(totalPages, start + size - 1)
  start = Math.max(1, end - size + 1)
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function formatBR(n: number): string {
  return n.toLocaleString('pt-BR')
}

export default function Pagination({
  variant = 'default',
  page,
  totalPages,
  totalItems,
  itemsPerPage = 10,
  onChange,
  className,
}: PaginationProps) {
  const [inputValue, setInputValue] = useState(String(page))
  // Sync the editable input with the `page` prop when it changes externally,
  // adjusting state during render instead of in an effect.
  const [prevPage, setPrevPage] = useState(page)
  if (page !== prevPage) {
    setPrevPage(page)
    setInputValue(String(page))
  }

  const isFirst = page <= 1
  const isLast = page >= totalPages

  function commitInput() {
    const n = parseInt(inputValue, 10)
    if (!isNaN(n) && n >= 1 && n <= totalPages) {
      onChange(n)
    } else {
      setInputValue(String(page))
    }
  }

  const itemStart = (page - 1) * itemsPerPage + 1
  const itemEnd = totalItems ? Math.min(page * itemsPerPage, totalItems) : page * itemsPerPage

  return (
    <div className={cx(styles.root, styles[variant], className ?? '')}>
      {/* Seta anterior */}
      <Button
        variant="tertiary"
        size="sm"
        iconLeft="chevron_left"
        disabled={isFirst}
        aria-label="Página anterior"
        onClick={() => onChange(page - 1)}
      />

      {/* Variante: pages */}
      {variant === 'pages' && (
        <div className={styles.infos}>
          <input
            className={`type-body-sm ${styles.pageInput}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={commitInput}
            onKeyDown={(e) => e.key === 'Enter' && commitInput()}
            aria-label="Página atual"
          />
          <span className={`type-body-sm ${styles.infoText}`}>
            de {totalPages} {totalPages === 1 ? 'página' : 'páginas'}
          </span>
        </div>
      )}

      {/* Variante: items */}
      {variant === 'items' && (
        <div className={styles.infos}>
          <span className={`type-body-sm ${styles.infoText}`}>
            {itemStart}–{itemEnd}
          </span>
          <span className={`type-body-sm ${styles.infoText}`}>de</span>
          <span className={`type-body-sm ${styles.infoText}`}>
            {totalItems != null ? formatBR(totalItems) : '?'}{' '}
            {(totalItems ?? 0) === 1 ? 'item' : 'itens'}
          </span>
        </div>
      )}

      {/* Variante: buttons */}
      {variant === 'buttons' && (
        <div className={styles.pageButtons}>
          {getPageWindow(page, totalPages).map((p) => (
            <button
              key={p}
              className={cx(
                'type-caption-md',
                styles.pageBtn,
                p === page ? styles.pageBtnActive : ''
              )}
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              <span className={p === page ? styles.pageBtnLabel : ''}>{p}</span>
            </button>
          ))}
        </div>
      )}

      {/* Seta próxima */}
      <Button
        variant="tertiary"
        size="sm"
        iconLeft="chevron_right"
        disabled={isLast}
        aria-label="Próxima página"
        onClick={() => onChange(page + 1)}
      />
    </div>
  )
}
