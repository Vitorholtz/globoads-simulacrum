import styles from './Breadcrumb.module.css'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'

export interface BreadcrumbItem {
  label: string
  onClick?: () => void
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={styles.breadcrumb}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={index} className={styles.item}>
              {index > 0 && (
                <span
                  className={`material-symbols-rounded ${styles.separator}`}
                  style={{ fontVariationSettings: FVAR_OUTLINED_SM }}
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              )}
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button className={styles.link} onClick={item.onClick}>
                  {item.label}
                </button>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
