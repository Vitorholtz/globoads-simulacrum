import { NavLink } from 'react-router-dom'
import globoAdsLogo from '../../assets/globo-ads-logo.svg'
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
          <span className={`material-symbols-rounded icon-md ${styles.navIcon}`}>
            {icon}
          </span>
          {label}
        </span>
        {badge && <span className={`type-caption-xs ${styles.badge}`}>{badge}</span>}
      </span>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ['type-body-sm', styles.navItem, isActive ? styles.navItemActive : ''].join(' ')
      }
    >
      {({ isActive }) => (
        <>
          <span className={styles.navItemInner}>
            <span className={`material-symbols-rounded icon-md ${isActive ? 'icon-filled' : ''} ${styles.navIcon}`}>
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
    <nav className={styles.sidebar}>
      <div className={styles.logoArea}>
        <img src={globoAdsLogo} alt="Globo Ads" className={styles.logo} />
      </div>

      <div className={styles.nav}>
        <div className={`${styles.section} ${styles.sectionDivider}`}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Foundation</span>
          <NavItem icon="palette" label="Colors" to="/colors" />
          <NavItem icon="format_size" label="Typography" to="/typography" />
          <NavItem icon="grid_view" label="Iconography" to="/icons" />
          <NavItem icon="straighten" label="Dimensões" to="/dimensions" />
          <NavItem icon="auto_awesome" label="Efeitos" to="/effects" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Actions</span>
          <NavItem icon="smart_button" label="Button" to="/button" />
          <NavItem icon="warning" label="Button · Danger" to="/danger-button" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Structures</span>
          <NavItem icon="crop_square" label="Static Cards" to="/static-card" />
          <NavItem icon="touch_app" label="Interactive Cards" to="/interactive-card" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Navigations</span>
          <NavItem icon="link" label="Hyperlinks" to="/hyperlinks" />
          <NavItem icon="tab" label="Tabs" to="/tabs" />
          <NavItem icon="more_horiz" label="Pagination" to="/pagination" />
          <NavItem icon="route" label="Breadcrumb" to="/breadcrumb" />
          <NavItem icon="checklist" label="Summary Stepper" to="/summary-stepper" disabled badge="Em breve" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Indicators</span>
          <NavItem icon="label" label="Badge Status" to="/badge" />
          <NavItem icon="fiber_manual_record" label="Badge Pointer" to="/badge-pointer" />
          <NavItem icon="badge" label="Badge Counter" to="/badge-counter" />
          <NavItem icon="motion_blur" label="Inline Loader" to="/inline-loader" />
          <NavItem icon="hide_image" label="Skeleton" to="/skeleton" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Inputs</span>
          <NavItem icon="text_fields" label="Text Field" to="/text-field" />
          <NavItem icon="subject" label="Textarea" to="/textarea" />
          <NavItem icon="arrow_drop_down_circle" label="Select" to="/select" />
          <NavItem icon="search_check" label="Combobox" to="/combobox" />
          <NavItem icon="check_box" label="Checkbox" to="/checkbox" />
          <NavItem icon="radio_button_checked" label="Radio Button" to="/radio" />
          <NavItem icon="toggle_on" label="Switch" to="/switch" />
          <NavItem icon="sell" label="Chips" to="/chips" />
          <NavItem icon="edit_calendar" label="Date Picker" to="/date-picker" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Utilities</span>
          <NavItem icon="unfold_more" label="Collapse" to="/collapse" />
          <NavItem icon="expand_all" label="Accordion" to="/accordion" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Alerts</span>
          <NavItem icon="info" label="Info Panel" to="/info-panel" />
          <NavItem icon="notification_important" label="Toast" to="/toast" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Overlays</span>
          <NavItem icon="tooltip" label="Tooltip" to="/tooltip" />
        </div>

        <div className={styles.section}>
          <span className={`type-caption-sm ${styles.sectionLabel}`}>Visual resources</span>
          <NavItem icon="account_circle" label="Avatar" to="/avatar" />
        </div>
      </div>

      <div className={styles.sidebarFooter}>
        <span className={`type-caption-md ${styles.footerTitle}`}>Globo Ads Simulacrum</span>
        <span className={`type-caption-sm ${styles.footerSub}`}>Biblioteca de componentes</span>
      </div>
    </nav>
  )
}
