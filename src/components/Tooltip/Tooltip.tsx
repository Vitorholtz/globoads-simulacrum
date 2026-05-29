import type { TooltipPosition, TooltipAlign } from '../../tokens/tooltip'
import styles from './Tooltip.module.css'

export interface TooltipProps {
  text: string
  position?: TooltipPosition
  align?: TooltipAlign
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
        className={[
          'type-body-sm',
          styles.tooltip,
          styles[position],
          styles[align],
          forceVisible ? styles.visible : '',
        ].filter(Boolean).join(' ')}
      >
        {text}
        <span className={styles.arrow} aria-hidden="true" />
      </div>
    </div>
  )
}
