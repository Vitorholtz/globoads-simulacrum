import styles from './StaticCard.module.css'
import type { CardStyle } from '../../tokens/cards'
import { cx } from '../../utils/cx'

export interface StaticCardProps {
  style?: CardStyle
  children?: React.ReactNode
  className?: string
}

export default function StaticCard({ style = 'on-primary', children, className }: StaticCardProps) {
  return (
    <div
      className={cx(
        styles.card,
        style === 'on-secondary' ? styles.onSecondary : '',
        className ?? ''
      )}
    >
      {children}
    </div>
  )
}
