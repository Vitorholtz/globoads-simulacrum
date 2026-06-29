import { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import globoAdsLogo from '../../../assets/globo-ads-logo.svg'
import { CATEGORIES, PAGES } from '../../../pages/registry'
import DocBadge from '../DocBadge/DocBadge'
import styles from './Sidebar.module.css'

interface NavItemProps {
  label: string
  to: string
  disabled?: boolean
  badge?: string
  icon: string
  sub?: boolean
}

function NavItem({ label, to, disabled, badge, icon, sub }: NavItemProps) {
  const subClass = sub ? styles.navItemSub : ''

  if (disabled) {
    return (
      <span
        className={[`type-body-sm`, styles.navItem, styles.navItemDisabled, subClass].join(' ')}
      >
        <span className={styles.navItemInner}>
          <span className={`material-symbols-rounded icon-md ${styles.navIcon}`}>{icon}</span>
          {label}
        </span>
        {badge && <DocBadge className="type-caption-xs">{badge}</DocBadge>}
      </span>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        ['type-body-sm', styles.navItem, isActive ? styles.navItemActive : '', subClass].join(' ')
      }
    >
      {({ isActive }: { isActive: boolean }) => (
        <>
          <span className={styles.navItemInner}>
            <span
              className={`material-symbols-rounded icon-md ${isActive ? 'icon-filled' : ''} ${styles.navIcon}`}
            >
              {icon}
            </span>
            {label}
          </span>
          {badge && <DocBadge className="type-caption-xs">{badge}</DocBadge>}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  return (
    <nav className={styles.root} aria-label="Navegação principal">
      <div className={styles.logoArea}>
        <img src={globoAdsLogo} alt="Globo Ads" className={styles.logo} />
      </div>

      <div className={styles.nav}>
        {CATEGORIES.map((category, index) => {
          const allItems = PAGES.filter((page) => page.category === category)
          const topLevel = allItems.filter((page) => !page.parent)
          if (topLevel.length === 0) return null

          return (
            <div
              key={category}
              className={
                index === 0 ? `${styles.section} ${styles.sectionDivider}` : styles.section
              }
            >
              <span className={`type-caption-sm ${styles.sectionLabel}`}>{category}</span>
              {topLevel.map((page) => {
                const children = allItems.filter((p) => p.parent === page.path)
                return (
                  <Fragment key={page.path}>
                    <NavItem
                      icon={page.icon}
                      label={page.label}
                      to={page.path}
                      disabled={page.disabled}
                      badge={page.badge}
                    />
                    {children.map((child) => (
                      <NavItem
                        key={child.path}
                        icon={child.icon}
                        label={child.label}
                        to={child.path}
                        disabled={child.disabled}
                        badge={child.badge}
                        sub
                      />
                    ))}
                  </Fragment>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className={styles.sidebarFooter}>
        <span className={`type-caption-md ${styles.footerTitle}`}>Globo Ads Design System</span>
        <span className={`type-caption-sm ${styles.footerSub}`}>Biblioteca de componentes</span>
      </div>
    </nav>
  )
}
