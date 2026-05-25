import type { BadgeVariant } from '../../tokens/badge'
import styles from './Badge.module.css'

interface BadgeProps {
  variant?: BadgeVariant
  label: string
  className?: string
}

export default function Badge({ variant = 'neutral', label, className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {label}
    </span>
  )
}
