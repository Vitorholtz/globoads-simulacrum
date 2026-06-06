import styles from './InteractiveCard.module.css'
import type { CardStyle } from '../../tokens/cards'
import { cx } from '../../utils/cx'

type AllowedAs = 'button' | 'a' | 'label' | 'div'

type ElementPropsMap = {
  button: React.ButtonHTMLAttributes<HTMLButtonElement>
  a: React.AnchorHTMLAttributes<HTMLAnchorElement>
  label: React.LabelHTMLAttributes<HTMLLabelElement>
  div: React.HTMLAttributes<HTMLDivElement>
}

export type InteractiveCardProps<T extends AllowedAs = 'button'> = {
  as?: T
  style?: CardStyle
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active'
  className?: string
  children?: React.ReactNode
} & Omit<ElementPropsMap[T], 'style' | 'children' | 'className'>

export default function InteractiveCard<T extends AllowedAs = 'button'>({
  as,
  style = 'on-primary',
  forceState,
  children,
  className,
  ...rest
}: InteractiveCardProps<T>) {
  const Tag = (as ?? 'button') as React.ElementType

  return (
    <Tag
      className={cx(
        styles.card,
        style === 'on-secondary' ? styles.onSecondary : '',
        className ?? ''
      )}
      data-state={forceState}
      {...rest}
    >
      {children}
    </Tag>
  )
}
