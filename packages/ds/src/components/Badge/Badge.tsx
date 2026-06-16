import type { BadgeVariant } from '../../tokens/badge'
import { cx } from '../../utils/cx'
import styles from './Badge.module.css'

interface BadgeProps {
  variant?: BadgeVariant
  /** Texto principal do status. Opcional quando o badge exibe apenas o link. */
  label?: string
  /**
   * Trecho sublinhado, estilo link, exibido após o `label` dentro da mesma
   * pílula. Indicador passivo por padrão; vira botão clicável quando há
   * `onLinkClick`, mantendo a cor da variante.
   */
  link?: string
  /** Torna o `link` clicável. Sem ele, o link é apenas texto sublinhado. */
  onLinkClick?: () => void
  className?: string
}

export default function Badge({
  variant = 'neutral',
  label,
  link,
  onLinkClick,
  className,
}: BadgeProps) {
  return (
    <span className={cx('type-caption-sm', styles.badge, styles[variant], className)}>
      {label}
      {link &&
        (onLinkClick ? (
          <button
            type="button"
            className={cx('type-caption-sm', styles.link)}
            onClick={onLinkClick}
          >
            {link}
          </button>
        ) : (
          <span className={cx('type-caption-sm', styles.link)}>{link}</span>
        ))}
    </span>
  )
}
