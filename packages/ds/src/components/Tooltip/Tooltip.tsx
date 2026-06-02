import type { TooltipPosition, TooltipAlign } from '../../tokens/tooltip'
import { cx } from '../../utils/cx'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  /** Tooltip content text */
  text: string
  position?: TooltipPosition
  align?: TooltipAlign
  /** Always shows the tooltip, bypassing the hover/focus trigger — for showcase/docs only */
  forceVisible?: boolean
  children: React.ReactNode
}

export default function Tooltip({
  text,
  position = 'up',
  align = 'middle',
  forceVisible = false,
  children,
}: TooltipProps) {
  return (
    <div className={styles.wrapper}>
      {children}
      <div
        role="tooltip"
        className={cx(
          'type-body-sm',
          styles.tooltip,
          styles[position],
          styles[align],
          forceVisible ? styles.visible : ''
        )}
      >
        {text}
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </div>
  )
}
