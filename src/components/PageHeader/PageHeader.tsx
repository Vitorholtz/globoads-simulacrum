import styles from './PageHeader.module.css'

interface Stat {
  value: string | number
  label: string
}

interface PageHeaderProps {
  breadcrumb: string
  title: string
  subtitle: string
  stats?: Stat[]
}

export default function PageHeader({ breadcrumb, title, subtitle, stats }: PageHeaderProps) {
  return (
    <header className={styles.pageHeader}>
      <div className={`type-caption-sm ${styles.breadcrumb}`}>{breadcrumb}</div>
      <h1 className={`type-display-sm ${styles.pageTitle}`}>{title}</h1>
      <p className={`type-body-md ${styles.pageSubtitle}`}>{subtitle}</p>
      {stats && (
        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={`type-caption-md ${styles.statValue}`}>{s.value}</span>
              <span className={`type-body-sm ${styles.statLabel}`}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
