import styles from './InteractiveCard.module.css'
import type { CardStyle } from '../../tokens/cards'

export interface InteractiveCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: CardStyle
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active'
}

export default function InteractiveCard({
  style = 'on-primary',
  forceState,
  children,
  className,
  ...rest
}: InteractiveCardProps) {
  return (
    <button
      className={[
        styles.card,
        style === 'on-secondary' ? styles.onSecondary : '',
        className ?? '',
      ].filter(Boolean).join(' ')}
      data-state={forceState}
      {...rest}
    >
      {children}
    </button>
  )
}
