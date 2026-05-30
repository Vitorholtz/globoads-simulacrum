import styles from './Tabs.module.css'
import BadgeCounter from '../BadgeCounter/BadgeCounter'
import type { TabItem, TabPosition } from '../../tokens/tabs'

export type { TabItem }

export interface TabsProps {
  items: TabItem[]
  activeId?: string
  onChange?: (id: string) => void
  position?: TabPosition
  className?: string
}

export default function Tabs({
  items,
  activeId,
  onChange,
  position = 'top',
  className,
}: TabsProps) {
  return (
    <div
      role="tablist"
      className={[styles.tabs, styles[position], className ?? ''].filter(Boolean).join(' ')}
    >
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <button
            key={item.id}
            role="tab"
            aria-selected={isActive}
            className={['type-caption-lg', styles.tab, isActive ? styles.tabActive : '']
              .filter(Boolean)
              .join(' ')}
            onClick={() => onChange?.(item.id)}
          >
            {item.icon && (
              <span
                className={`material-symbols-rounded icon-md ${styles.tabIcon}`}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            )}
            {item.label}
            {item.badge !== undefined && <BadgeCounter value={item.badge} />}
          </button>
        )
      })}
    </div>
  )
}
