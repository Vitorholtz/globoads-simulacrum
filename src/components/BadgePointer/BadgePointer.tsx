import styles from './BadgePointer.module.css'

interface BadgePointerProps {
  className?: string
}

export default function BadgePointer({ className }: BadgePointerProps) {
  return (
    <span className={[styles.pointer, className].filter(Boolean).join(' ')}>
      <span className={styles.dot} />
    </span>
  )
}
