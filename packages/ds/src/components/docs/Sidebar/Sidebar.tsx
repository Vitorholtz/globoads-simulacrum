import { NavLink } from 'react-router-dom'
import globoAdsLogo from '../../../assets/globo-ads-logo.svg'
import { CATEGORIES, PAGES } from '../../../pages/registry'
import styles from './Sidebar.module.css'

interface NavItemProps {
  label: string
  to: string
  disabled?: boolean
  badge?: string
  icon: string
}

function NavItem({ label, to, disabled, badge, icon }: NavItemProps) {
  if (disabled) {
    return (
      <span className={[`type-body-sm`, styles.navItem, styles.navItemDisabled].join(' ')}>
        <span className={styles.navItemInner}>
          <span className={`material-symbols-rounded icon-md ${styles.navIcon}`}>{icon}</span>
          {label}
        </span>
        {badge && <span className={`type-caption-xs ${styles.badge}`}>{badge}</span>}
      </span>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        ['type-body-sm', styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
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
          {badge && <span className={`type-caption-xs ${styles.badge}`}>{badge}</span>}
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
          const items = PAGES.filter((page) => page.category === category)
          if (items.length === 0) return null

          return (
            <div
              key={category}
              className={
                index === 0 ? `${styles.section} ${styles.sectionDivider}` : styles.section
              }
            >
              <span className={`type-caption-sm ${styles.sectionLabel}`}>{category}</span>
              {items.map((page) => (
                <NavItem
                  key={page.path}
                  icon={page.icon}
                  label={page.label}
                  to={page.path}
                  disabled={page.disabled}
                  badge={page.badge}
                />
              ))}
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
