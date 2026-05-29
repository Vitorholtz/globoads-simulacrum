import styles from './SectionHeader.module.css'

interface SectionHeaderProps {
  icon: string
  title: string
  count?: string
}

export default function SectionHeader({ icon, title, count }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <span
        className={`material-symbols-rounded icon-md icon-filled ${styles.sectionIcon}`}
      >
        {icon}
      </span>
      <h2 className={`type-title-md ${styles.sectionTitle}`}>{title}</h2>
      {count && <span className={`type-caption-sm ${styles.sectionCount}`}>{count}</span>}
    </div>
  )
}
