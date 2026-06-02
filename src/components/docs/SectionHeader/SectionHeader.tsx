import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  icon: string
  title: string
  count?: string | number
  description?: string
}

export default function SectionHeader({ icon, title, count, description }: SectionHeaderProps) {
  return (
    <div className={styles.root}>
      <div className={styles.sectionHeaderRow}>
        <span className={`material-symbols-rounded icon-md icon-filled ${styles.sectionIcon}`}>
          {icon}
        </span>
        <h2 className={`type-title-md ${styles.sectionTitle}`}>{title}</h2>
        {count && <span className={`type-caption-sm ${styles.sectionCount}`}>{count}</span>}
      </div>
      {description && <p className={`type-body-sm ${styles.sectionDescription}`}>{description}</p>}
    </div>
  )
}
