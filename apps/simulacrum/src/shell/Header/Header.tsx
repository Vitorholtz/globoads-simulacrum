import { useLocation } from 'react-router-dom'
import { Avatar, Button, Tooltip } from '@globo-ads/ds'
import logo from '@globo-ads/ds/assets/globo-ads-logo.svg'
import { NAV } from '../routes'
import HeaderSelector from '../../components/HeaderSelector/HeaderSelector'
import styles from './Header.module.css'

function usePageTitle(): string {
  const { pathname } = useLocation()
  const match = NAV.find((item) =>
    item.path === '/' ? pathname === '/' : pathname.startsWith(item.path)
  )
  return match?.label ?? 'Globo Ads'
}

interface HeaderProps {
  sidebarPinned: boolean
  onMenuClick: () => void
  onMenuHoverEnter: () => void
  onMenuHoverLeave: () => void
}

export default function Header({
  sidebarPinned,
  onMenuClick,
  onMenuHoverEnter,
  onMenuHoverLeave,
}: HeaderProps) {
  const pageTitle = usePageTitle()

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logoGroup}>
          <div onMouseEnter={onMenuHoverEnter} onMouseLeave={onMenuHoverLeave}>
            <Tooltip text={sidebarPinned ? 'Fechar menu' : 'Menu'} position="bottom">
              <Button
                variant="tertiary"
                iconLeft={sidebarPinned ? 'left_panel_close' : 'apps'}
                aria-label={sidebarPinned ? 'Fechar menu' : 'Menu'}
                onClick={onMenuClick}
              />
            </Tooltip>
          </div>
          <img src={logo} alt="Globo Ads" className={styles.logo} />
        </div>
        <span className={`${styles.divider} ${styles.hideMobile}`} aria-hidden="true" />
        <span className={`type-title-sm ${styles.subheader} ${styles.hideMobile}`}>
          {pageTitle}
        </span>
      </div>

      <div className={styles.right}>
        <div className={styles.actions}>
          <Tooltip text="Carrinho" position="bottom">
            <Button variant="tertiary" iconLeft="shopping_cart" aria-label="Carrinho" />
          </Tooltip>
          <Tooltip text="Notificações" position="bottom">
            <Button variant="tertiary" iconLeft="notifications" aria-label="Notificações" />
          </Tooltip>
          <Tooltip text="Configurações" position="bottom">
            <Button variant="tertiary" iconLeft="settings" aria-label="Configurações" />
          </Tooltip>
        </div>
        <Button variant="secondary" iconLeft="add" className={styles.hideMobile}>
          Criar
        </Button>
        <span className={`${styles.divider} ${styles.hideMobile}`} aria-hidden="true" />
        <div className={styles.hideMobile}>
          <HeaderSelector name="Café Orfeu" description="12.345.678/0001-99" />
        </div>
        <Avatar name="Café Orfeu" size="md" />
      </div>
    </header>
  )
}
