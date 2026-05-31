import styles from './InteractiveCard.module.css'
import type { CardStyle } from '../../tokens/cards'
import { cx } from '../../utils/cx'

export interface InteractiveCardProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'style'
> {
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
      className={cx(
        styles.card,
        style === 'on-secondary' ? styles.onSecondary : '',
        className ?? ''
      )}
      data-state={forceState}
      {...rest}
    >
      {children}
    </button>
  )
}
