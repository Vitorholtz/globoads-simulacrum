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

const FVAR: Record<ButtonSize, string> = {
  sm: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
  md: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  lg: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
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
        className={`material-symbols-rounded ${styles.icon}`}
        style={{ fontVariationSettings: FVAR[size] }}
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
          {children && <span className={styles.label}>{children}</span>}
          {!isLoading && iconRight && renderIcon(iconRight)}
        </>
      )}
    </button>
  )
}
