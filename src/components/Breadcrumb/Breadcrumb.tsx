import styles from './Breadcrumb.module.css'

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
                  className={`material-symbols-rounded icon-sm ${styles.separator}`}
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              )}
              {isLast ? (
                <span className={`type-title-sm ${styles.current}`} aria-current="page">
                  {item.label}
                </span>
              ) : (
                <button className={`type-body-sm ${styles.link}`} onClick={item.onClick}>
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
