import styles from './BadgeCounter.module.css'

export interface BadgeCounterProps {
  value: string | number
  className?: string
}

export default function BadgeCounter({ value, className }: BadgeCounterProps) {
  return (
    <span className={['type-caption-sm', styles.badge, className ?? ''].filter(Boolean).join(' ')}>
      {value}
    </span>
  )
}
