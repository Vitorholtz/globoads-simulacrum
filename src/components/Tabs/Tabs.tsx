import styles from './Tabs.module.css'
import { FVAR_OUTLINED_SM } from '../../utils/iconVariation'
import BadgeCounter from '../BadgeCounter/BadgeCounter'
import type { TabPosition } from '../../tokens/tabs'

export interface TabItem {
  id: string
  label: string
  icon?: string
  badge?: string | number
}

export interface TabsProps {
  items: TabItem[]
  activeId?: string
  onChange?: (id: string) => void
  position?: TabPosition
  className?: string
}

export default function Tabs({ items, activeId, onChange, position = 'top', className }: TabsProps) {
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
            className={[styles.tab, isActive ? styles.tabActive : ''].filter(Boolean).join(' ')}
            onClick={() => onChange?.(item.id)}
          >
            {item.icon && (
              <span
                className={`material-symbols-rounded ${styles.tabIcon}`}
                style={{ fontVariationSettings: FVAR_OUTLINED_SM }}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            )}
            {item.label}
            {item.badge !== undefined && (
              <BadgeCounter value={item.badge} />
            )}
          </button>
        )
      })}
    </div>
  )
}
