import styles from './Button.module.css'
import type { ButtonVariant, ButtonSize } from '../../tokens/buttons'

export type { ButtonVariant, ButtonSize }

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  iconLeft?: string
  iconRight?: string
  loading?: boolean
  danger?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active' | 'disabled' | 'loading'
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
  loading = false,
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
  const isDisabled = disabled || loading || forceState === 'disabled' || forceState === 'loading'
  const isLoading = loading || forceState === 'loading'

  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    danger ? styles.danger : '',
    isIconOnly ? styles.iconOnly : '',
    hasIconLeft ? styles.hasIconLeft : '',
    hasIconRight ? styles.hasIconRight : '',
    isLoading ? styles.loading : '',
    className ?? '',
  ].filter(Boolean).join(' ')

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

  const spinner = <span className={styles.spinner} aria-hidden="true" />

  return (
    <button
      className={cls}
      disabled={isDisabled}
      data-state={forceState}
      {...rest}
    >
      {/* Icon-only layout */}
      {isIconOnly && (isLoading ? spinner : renderIcon((iconLeft || iconRight)!))}

      {/* With-label layout */}
      {!isIconOnly && (
        <>
          {isLoading ? spinner : (iconLeft && renderIcon(iconLeft))}
          {children && <span className={`${LABEL_TYPE[size]} ${styles.label}`}>{children}</span>}
          {!isLoading && iconRight && renderIcon(iconRight)}
        </>
      )}
    </button>
  )
}
