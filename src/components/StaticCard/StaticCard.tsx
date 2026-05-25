import styles from './StaticCard.module.css'
import type { CardStyle } from '../../tokens/cards'

export interface StaticCardProps {
  style?: CardStyle
  children?: React.ReactNode
  className?: string
}

export default function StaticCard({ style = 'on-primary', children, className }: StaticCardProps) {
  return (
    <div
      className={[
        styles.card,
        style === 'on-secondary' ? styles.onSecondary : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
    >
      {children}
    </div>
  )
}
