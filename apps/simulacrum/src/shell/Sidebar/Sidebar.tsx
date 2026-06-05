import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import type { MouseEventHandler } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Hyperlink } from '@globo-ads/ds'
import { NAV_SECTIONS, NAV_FOOTER } from '../routes'
import type { NavItem, NavSection } from '../routes'
import styles from './Sidebar.module.css'

const SIDEBAR_ORDER_KEY = 'sidebar_order'

type SectionOrder = Record<string, string[]>

function readSavedOrder(): SectionOrder | null {
  try {
    const raw = localStorage.getItem(SIDEBAR_ORDER_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null
    return parsed as SectionOrder
  } catch {
    return null
  }
}

function applyOrder(sections: NavSection[], savedOrder: SectionOrder): NavSection[] {
  return sections.map((section) => {
    const paths = savedOrder[section.title]
    if (!Array.isArray(paths)) return section
    const itemMap = new Map(section.items.map((i) => [i.path, i]))
    const reordered = paths.flatMap((p) => (itemMap.get(p) ? [itemMap.get(p)!] : []))
    const seen = new Set(paths)
    const unseen = section.items.filter((i) => !seen.has(i.path))
    return { ...section, items: [...reordered, ...unseen] }
  })
}

function saveOrder(sections: NavSection[]) {
  try {
    const order: SectionOrder = {}
    for (const s of sections) {
      order[s.title] = s.items.map((i) => i.path)
    }
    localStorage.setItem(SIDEBAR_ORDER_KEY, JSON.stringify(order))
  } catch {
    // localStorage indisponível
  }
}

function findSection(sections: NavSection[], id: string) {
  return sections.find((s) => s.items.some((i) => i.path === id)) ?? null
}

function findItem(sections: NavSection[], id: string) {
  for (const s of sections) {
    const item = s.items.find((i) => i.path === id)
    if (item) return item
  }
  return null
}

function NavItemContent({ item, isActive }: { item: NavItem; isActive?: boolean }) {
  return (
    <>
      <span
        className={['material-symbols-rounded icon-md', isActive ? 'icon-filled' : '']
          .filter(Boolean)
          .join(' ')}
        aria-hidden="true"
      >
        {item.icon}
      </span>
      <span className={`type-caption-lg ${styles.label}`}>{item.label}</span>
      {item.external && (
        <span
          className={`material-symbols-rounded icon-md ${styles.externalIcon}`}
          aria-hidden="true"
        >
          open_in_new
        </span>
      )}
    </>
  )
}

function NavItemRow({
  item,
  onNavigate,
  draggable = false,
}: {
  item: NavItem
  onNavigate: () => void
  draggable?: boolean
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.path, disabled: !draggable })

  const linkContent = item.external ? (
    <a
      href={item.path}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.item}
      onClick={onNavigate}
    >
      <NavItemContent item={item} />
    </a>
  ) : (
    <NavLink
      to={item.path}
      end={item.path === '/'}
      className={({ isActive }) =>
        [styles.item, isActive ? styles.active : ''].filter(Boolean).join(' ')
      }
      onClick={onNavigate}
    >
      {({ isActive }) => <NavItemContent item={item} isActive={isActive} />}
    </NavLink>
  )

  if (!draggable) {
    return <li>{linkContent}</li>
  }

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={[styles.sortableItem, isDragging ? styles.dragging : ''].filter(Boolean).join(' ')}
    >
      <button
        ref={setActivatorNodeRef}
        {...attributes}
        {...listeners}
        className={styles.dragHandle}
        tabIndex={-1}
        aria-label="Mover item"
      >
        <span className="material-symbols-rounded icon-sm" aria-hidden="true">
          drag_indicator
        </span>
      </button>
      {linkContent}
    </li>
  )
}

interface SidebarProps {
  onMouseEnter: MouseEventHandler<HTMLElement>
  onMouseLeave: MouseEventHandler<HTMLElement>
  onNavigate: () => void
}

export default function Sidebar({ onMouseEnter, onMouseLeave, onNavigate }: SidebarProps) {
  const [sections, setSections] = useState<NavSection[]>(() => {
    const saved = readSavedOrder()
    return saved ? applyOrder(NAV_SECTIONS, saved) : NAV_SECTIONS
  })
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    saveOrder(sections)
  }, [sections])

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }))

  const activeItem = activeId ? findItem(sections, activeId) : null

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id))
  }

  function handleDragOver({ active, over }: DragOverEvent) {
    if (!over) return
    const aId = String(active.id)
    const oId = String(over.id)
    if (aId === oId) return

    const activeSection = findSection(sections, aId)
    const overSection = findSection(sections, oId)
    if (!activeSection || !overSection || activeSection.title === overSection.title) return

    setSections((prev) => {
      const item = activeSection.items.find((i) => i.path === aId)!
      const overIdx = overSection.items.findIndex((i) => i.path === oId)
      return prev.map((s) => {
        if (s.title === activeSection.title) {
          return { ...s, items: s.items.filter((i) => i.path !== aId) }
        }
        if (s.title === overSection.title) {
          const next = [...s.items]
          next.splice(overIdx >= 0 ? overIdx : next.length, 0, item)
          return { ...s, items: next }
        }
        return s
      })
    })
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    setActiveId(null)
    if (!over || active.id === over.id) return

    const aId = String(active.id)
    const oId = String(over.id)

    setSections((prev) => {
      const section = findSection(prev, aId)
      if (!section) return prev
      const oldIdx = section.items.findIndex((i) => i.path === aId)
      const newIdx = section.items.findIndex((i) => i.path === oId)
      if (oldIdx === -1 || newIdx === -1 || oldIdx === newIdx) return prev
      return prev.map((s) =>
        s.title === section.title ? { ...s, items: arrayMove(s.items, oldIdx, newIdx) } : s
      )
    })
  }

  return (
    <nav
      className={styles.sidebar}
      aria-label="Navegação principal"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.mobileCreate}>
        <Button variant="secondary" iconLeft="add">
          Criar
        </Button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.sections}>
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <span className={`type-caption-md ${styles.sectionHead}`}>{section.title}</span>
              <SortableContext
                items={section.items.map((i) => i.path)}
                strategy={verticalListSortingStrategy}
              >
                <ul className={styles.list}>
                  {section.items.map((item) => (
                    <NavItemRow key={item.path} item={item} onNavigate={onNavigate} draggable />
                  ))}
                </ul>
              </SortableContext>
            </div>
          ))}
        </div>

        <DragOverlay>
          {activeItem && (
            <div className={`${styles.item} ${styles.overlay}`}>
              <NavItemContent item={activeItem} />
            </div>
          )}
        </DragOverlay>
      </DndContext>

      <div className={styles.spacer} />

      <div className={styles.footer}>
        <ul className={styles.list}>
          {NAV_FOOTER.map((item) => (
            <NavItemRow key={item.path} item={item} onNavigate={onNavigate} />
          ))}
        </ul>
        <div className={styles.footerText}>
          <span className={`type-body-xs ${styles.footerLabel}`}>Confira</span>
          <Hyperlink href="https://ads.globo.com" size="xs" external>
            Portal Globo Ads
          </Hyperlink>
        </div>
      </div>
    </nav>
  )
}
