import type { ReactNode } from 'react'
import styles from './DocBadge.module.css'

interface DocBadgeProps {
  variant?: 'neutral' | 'warning' | 'accent' | 'outlined'
  size?: 'sm' | 'md'
  children: ReactNode
  className?: string
}

export default function DocBadge({
  variant = 'neutral',
  size = 'sm',
  children,
  className,
}: DocBadgeProps) {
  const classes = `${styles.badge} ${styles[size]} ${styles[variant]}${className ? ` ${className}` : ''}`
  return <span className={classes}>{children}</span>
}
