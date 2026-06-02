import { cx } from '../../utils/cx'
import styles from './BadgeCounter.module.css'

export interface BadgeCounterProps {
  value: string | number
  className?: string
}

export default function BadgeCounter({ value, className }: BadgeCounterProps) {
  return <span className={cx('type-caption-sm', styles.badge, className ?? '')}>{value}</span>
}
