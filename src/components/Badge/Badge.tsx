import type { BadgeVariant } from '../../tokens/badge'
import { cx } from '../../utils/cx'
import styles from './Badge.module.css'

interface BadgeProps {
  variant?: BadgeVariant
  label: string
  className?: string
}

export default function Badge({ variant = 'neutral', label, className }: BadgeProps) {
  return (
    <span className={cx('type-caption-sm', styles.badge, styles[variant], className)}>{label}</span>
  )
}
