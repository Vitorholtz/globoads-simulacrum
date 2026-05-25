import { FVAR_FILLED_SM } from '../../utils/iconVariation'
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
        className={`material-symbols-rounded ${styles.sectionIcon}`}
        style={{ fontVariationSettings: FVAR_FILLED_SM }}
      >
        {icon}
      </span>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {count && <span className={styles.sectionCount}>{count}</span>}
    </div>
  )
}
