import { useState, useId } from 'react'
import styles from './Collapse.module.css'
import type { CollapseSize } from '../../tokens/collapse'

export interface CollapseProps {
  size?: CollapseSize
  /** Quantas linhas exibir antes de truncar */
  lines?: number
  labelExpand?: string
  labelCollapse?: string
  children?: React.ReactNode
  defaultOpen?: boolean
  open?: boolean
  onToggle?: (open: boolean) => void
  forceState?: 'hover' | 'focus' | 'active'
  className?: string
}

const ICON_CLS: Record<CollapseSize, string> = {
  xs: 'icon-xs',
  sm: 'icon-sm',
  md: 'icon-md',
  lg: 'icon-lg',
}

const TYPE_CLS: Record<CollapseSize, string> = {
  xs: 'hyperlink-xs',
  sm: 'hyperlink-sm',
  md: 'hyperlink-md',
  lg: 'hyperlink-lg',
}

export default function Collapse({
  size = 'md',
  lines = 3,
  labelExpand = 'Ver mais',
  labelCollapse = 'Ver menos',
  children,
  defaultOpen = false,
  open,
  onToggle,
  forceState,
  className,
}: CollapseProps) {
  const contentId = useId()

  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isOpen = isControlled ? (open ?? false) : internalOpen

  function handleToggle() {
    if (forceState) return
    const next = !isOpen
    if (!isControlled) setInternalOpen(next)
    onToggle?.(next)
  }

  const rootCls = [styles.root, styles[size], className ?? ''].filter(Boolean).join(' ')

  const triggerCls = [
    styles.trigger,
    TYPE_CLS[size],
    forceState ? styles[forceState] : '',
  ].filter(Boolean).join(' ')

  const contentCls = [
    styles.content,
    !isOpen ? styles.contentClamped : '',
  ].filter(Boolean).join(' ')

  const label = isOpen ? labelCollapse : labelExpand

  return (
    <div className={rootCls}>
      {children && (
        <div
          id={contentId}
          className={contentCls}
          style={!isOpen ? { WebkitLineClamp: lines } : undefined}
        >
          {children}
        </div>
      )}
      <button
        type="button"
        className={triggerCls}
        aria-expanded={isOpen}
        aria-controls={children ? contentId : undefined}
        onClick={handleToggle}
      >
        <span className={styles.triggerText}>{label}</span>
        <span
          className={[
            `material-symbols-rounded ${ICON_CLS[size]}`,
            styles.triggerIcon,
            isOpen ? styles.triggerIconOpen : '',
          ].filter(Boolean).join(' ')}
          aria-hidden="true"
        >
          keyboard_arrow_down
        </span>
      </button>
    </div>
  )
}
