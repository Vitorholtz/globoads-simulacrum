import type { ReactNode } from 'react'
import styles from './CardGrid.module.css'

interface CardGridProps {
  wide?: boolean
  children: ReactNode
  className?: string
}

export default function CardGrid({ wide, children, className }: CardGridProps) {
  const cls = [styles.grid, wide ? styles.wide : styles.default, className]
    .filter(Boolean)
    .join(' ')
  return <div className={cls}>{children}</div>
}
