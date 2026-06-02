import { cx } from '../../utils/cx'
import styles from './Button.module.css'
import type { ButtonVariant, ButtonSize } from '../../tokens/buttons'

export type { ButtonVariant, ButtonSize }

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Material Symbol icon name; renders left of the label (or as icon-only when no children) */
  iconLeft?: string
  /** Material Symbol icon name; renders right of the label (or as icon-only when no children) */
  iconRight?: string
  /** Applies destructive/danger styling */
  danger?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'disabled'
}

const ICON_SIZE: Record<ButtonSize, string> = {
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-md',
}

const LABEL_TYPE: Record<ButtonSize, string> = {
  sm: 'type-caption-md',
  md: 'type-caption-lg',
  lg: 'type-caption-lg',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  danger = false,
  forceState,
  disabled,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isIconOnly = !children && !!(iconLeft || iconRight)
  const hasIconLeft = !!iconLeft && !isIconOnly
  const hasIconRight = !!iconRight && !isIconOnly
  const isDisabled = disabled || forceState === 'disabled'

  const cls = cx(
    styles.btn,
    styles[variant],
    styles[size],
    danger ? styles.danger : '',
    isIconOnly ? styles.iconOnly : '',
    hasIconLeft ? styles.hasIconLeft : '',
    hasIconRight ? styles.hasIconRight : '',
    className ?? ''
  )

  function renderIcon(name: string) {
    return (
      <span
        className={`material-symbols-rounded ${ICON_SIZE[size]} ${styles.icon}`}
        aria-hidden="true"
      >
        {name}
      </span>
    )
  }

  return (
    <button className={cls} disabled={isDisabled} data-state={forceState} {...rest}>
      {/* Icon-only layout */}
      {isIconOnly && renderIcon((iconLeft || iconRight)!)}

      {/* With-label layout */}
      {!isIconOnly && (
        <>
          {iconLeft && renderIcon(iconLeft)}
          {children && <span className={`${LABEL_TYPE[size]} ${styles.label}`}>{children}</span>}
          {iconRight && renderIcon(iconRight)}
        </>
      )}
    </button>
  )
}
