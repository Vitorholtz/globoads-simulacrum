import { cx } from '../../utils/cx'
import styles from './BadgePointer.module.css'

interface BadgePointerProps {
  className?: string
}

export default function BadgePointer({ className }: BadgePointerProps) {
  return (
    <span className={cx(styles.pointer, className)}>
      <span className={styles.dot} />
    </span>
  )
}
