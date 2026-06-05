import styles from './HeaderSelector.module.css'

interface HeaderSelectorProps {
  name: string
  description: string
  onClick?: () => void
}

export default function HeaderSelector({ name, description, onClick }: HeaderSelectorProps) {
  return (
    <button type="button" className={styles.root} onClick={onClick}>
      <span className={styles.content}>
        <span className={`type-caption-md ${styles.name}`}>{name}</span>
        <span className={`type-body-xs ${styles.description}`}>{description}</span>
      </span>
      <span className={`material-symbols-rounded icon-md ${styles.chevron}`} aria-hidden="true">
        keyboard_arrow_down
      </span>
    </button>
  )
}
