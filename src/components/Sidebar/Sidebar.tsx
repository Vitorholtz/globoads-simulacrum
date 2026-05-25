import globoAdsLogo from '../../assets/globo-ads-logo.svg'
import styles from './Sidebar.module.css'

const FVAR_OUTLINED = "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 20"
const FVAR_FILLED = "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20"

interface NavItemProps {
  label: string
  page: string
  activePage: string
  onNavigate: (page: string) => void
  disabled?: boolean
  badge?: string
  icon: string
}

function NavItem({ label, page, activePage, onNavigate, disabled, badge, icon }: NavItemProps) {
  const isActive = activePage === page

  return (
    <button
      className={[
        styles.navItem,
        isActive ? styles.navItemActive : '',
        disabled ? styles.navItemDisabled : '',
      ].join(' ')}
      onClick={() => !disabled && onNavigate(page)}
      disabled={disabled}
    >
      <span className={styles.navItemInner}>
        <span
          className={`material-symbols-rounded ${styles.navIcon}`}
          style={{ fontVariationSettings: isActive ? FVAR_FILLED : FVAR_OUTLINED }}
        >
          {icon}
        </span>
        {label}
      </span>
      {badge && <span className={styles.badge}>{badge}</span>}
    </button>
  )
}

interface SidebarProps {
  activePage: string
  onNavigate: (page: string) => void
}

export default function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoArea}>
        <img src={globoAdsLogo} alt="Globo Ads" className={styles.logo} />
      </div>

      <div className={styles.nav}>
        <div className={`${styles.section} ${styles.sectionDivider}`}>
          <span className={styles.sectionLabel}>Foundation</span>
          <NavItem icon="palette" label="Colors" page="colors" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="format_size" label="Typography" page="typography" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="grid_view" label="Iconography" page="icons" activePage={activePage} onNavigate={onNavigate} />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Actions</span>
          <NavItem icon="smart_button" label="Button" page="button" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="warning" label="Button · Danger" page="danger-button" activePage={activePage} onNavigate={onNavigate} />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Structures</span>
          <NavItem icon="crop_square" label="Static Cards" page="static-card" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="touch_app" label="Interactive Cards" page="interactive-card" activePage={activePage} onNavigate={onNavigate} />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Navigations</span>
          <NavItem icon="link" label="Hyperlinks" page="hyperlinks" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="tab" label="Tabs" page="tabs" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="more_horiz" label="Pagination" page="pagination" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="route" label="Breadcrumb" page="breadcrumb" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="checklist" label="Summary Stepper" page="summary-stepper" activePage={activePage} onNavigate={onNavigate} disabled badge="Em breve" />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Indicators</span>
          <NavItem icon="label" label="Badge Status" page="badge" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="fiber_manual_record" label="Badge Pointer" page="badge-pointer" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="badge" label="Badge Counter" page="badge-counter" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="motion_blur" label="Inline Loader" page="inline-loader" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="hide_image" label="Skeleton" page="skeleton" activePage={activePage} onNavigate={onNavigate} />
        </div>

        <div className={styles.section}>
          <span className={styles.sectionLabel}>Inputs</span>
          <NavItem icon="check_box" label="Checkbox" page="checkbox" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="radio_button_checked" label="Radio Button" page="radio" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="toggle_on" label="Switch" page="switch" activePage={activePage} onNavigate={onNavigate} />
          <NavItem icon="sell" label="Chips" page="chips" activePage={activePage} onNavigate={onNavigate} />
        </div>
      </div>

      <div className={styles.sidebarFooter}>
        <span className={styles.footerTitle}>Globo Ads Simulacrum</span>
        <span className={styles.footerSub}>Biblioteca de componentes</span>
      </div>
    </nav>
  )
}
