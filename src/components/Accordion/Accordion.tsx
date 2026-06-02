import { useState } from 'react'
import type { BadgeVariant } from '../../tokens/badge'
import Badge from '../Badge/Badge'
import { cx } from '../../utils/cx'
import styles from './Accordion.module.css'

export interface AccordionItem {
  id: string
  label: string
  icon?: string
  detail?: string
  badge?: { label: string; variant: BadgeVariant }
  content: React.ReactNode
}

export interface AccordionProps {
  items: AccordionItem[]
  /** id of the item that starts expanded on first render (uncontrolled usage) */
  defaultOpenId?: string | null
  className?: string
}

export default function Accordion({ items, defaultOpenId = null, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId)

  function handleToggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className={cx(styles.root, className ?? '')}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id} className={styles.section}>
            <button
              type="button"
              className={styles.header}
              aria-expanded={isOpen}
              onClick={() => handleToggle(item.id)}
            >
              {item.icon && (
                <span
                  className={`material-symbols-rounded icon-md ${styles.leadingIcon}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              )}
              <span className={`type-title-sm ${styles.label}`}>{item.label}</span>
              {item.detail && (
                <span className={`type-body-xs ${styles.detail}`}>{item.detail}</span>
              )}
              {item.badge && <Badge label={item.badge.label} variant={item.badge.variant} />}
              <span
                className={cx(
                  'material-symbols-rounded icon-md',
                  styles.chevron,
                  isOpen ? styles.chevronOpen : ''
                )}
                aria-hidden="true"
              >
                keyboard_arrow_down
              </span>
            </button>
            <div className={styles.contentWrapper} data-open={isOpen ? 'true' : 'false'}>
              <div className={styles.contentOverflow}>
                <div className={styles.contentPadded}>{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
