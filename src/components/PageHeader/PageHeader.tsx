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
      <div className={styles.breadcrumb}>{breadcrumb}</div>
      <h1 className={styles.pageTitle}>{title}</h1>
      <p className={styles.pageSubtitle}>{subtitle}</p>
      {stats && (
        <div className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statValue}>{s.value}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
