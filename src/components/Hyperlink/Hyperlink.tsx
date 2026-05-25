import styles from './Hyperlink.module.css'
import type { HyperlinkSize } from '../../tokens/hyperlinks'

export type { HyperlinkSize }

export interface HyperlinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: HyperlinkSize
  external?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active'
}

const ICON_FVAR: Record<HyperlinkSize, string> = {
  xs: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 14",
  sm: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
  md: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20",
  lg: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
}

export default function Hyperlink({
  size = 'md',
  external = false,
  forceState,
  href,
  children,
  className,
  ...rest
}: HyperlinkProps) {
  const cls = [
    styles.hyperlink,
    styles[size],
    className ?? '',
  ].filter(Boolean).join(' ')

  return (
    <a
      className={cls}
      href={href ?? '#'}
      data-state={forceState}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      {...rest}
    >
      {children}
      {external && (
        <span
          className={`material-symbols-rounded ${styles.externalIcon}`}
          style={{ fontVariationSettings: ICON_FVAR[size] }}
          aria-hidden="true"
        >
          open_in_new
        </span>
      )}
    </a>
  )
}
