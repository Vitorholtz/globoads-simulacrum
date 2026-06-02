import type { ReactNode } from 'react'
import styles from './CardGrid.module.css'

interface CardGridProps {
  cols?: 2 | 3 | 4 | 'auto'
  children: ReactNode
  className?: string
}

const colsClass: Record<string, string> = {
  '2': styles.cols2,
  '3': styles.cols3,
  '4': styles.cols4,
  auto: styles.colsAuto,
}

export default function CardGrid({ cols = 'auto', children, className }: CardGridProps) {
  const cls = [styles.grid, colsClass[String(cols)], className].filter(Boolean).join(' ')
  return <div className={cls}>{children}</div>
}
