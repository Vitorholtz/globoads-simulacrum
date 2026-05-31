import { cx } from '../../utils/cx'
import styles from './Hyperlink.module.css'
import type { HyperlinkSize } from '../../tokens/hyperlinks'

export type { HyperlinkSize }

export interface HyperlinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: HyperlinkSize
  external?: boolean
  underline?: boolean
  /** Forces a visual state for documentation/showcase purposes only */
  forceState?: 'hover' | 'focus' | 'active'
}

const ICON_CLS: Record<HyperlinkSize, string> = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const SIZE_CLASS: Record<HyperlinkSize, string> = {
  xs: 'hyperlink-xs',
  sm: 'hyperlink-sm',
  md: 'hyperlink-md',
  lg: 'hyperlink-lg',
}

export default function Hyperlink({
  size = 'md',
  external = false,
  underline = false,
  forceState,
  href,
  children,
  className,
  ...rest
}: HyperlinkProps) {
  const cls = cx(
    SIZE_CLASS[size],
    underline ? 'hyperlink-underline' : '',
    styles.hyperlink,
    styles[size],
    className ?? ''
  )

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
          className={`material-symbols-rounded ${ICON_CLS[size]} ${styles.externalIcon}`}
          aria-hidden="true"
        >
          open_in_new
        </span>
      )}
    </a>
  )
}
