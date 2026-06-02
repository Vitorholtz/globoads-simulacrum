import { Link } from 'react-router-dom'
import { Avatar, Button } from '@globo-ads/ds'
import logo from '@globo-ads/ds/assets/globo-ads-logo.svg'
import styles from './Header.module.css'

/** Barra superior global: marca + ações do usuário. */
export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} aria-label="Globo Ads Simulacrum — início">
        <img src={logo} alt="Globo Ads" className={styles.logo} />
        <span className={`type-title-sm ${styles.product}`}>Simulacrum</span>
      </Link>

      <div className={styles.actions}>
        <Button variant="tertiary" iconLeft="notifications" aria-label="Notificações" />
        <Button variant="tertiary" iconLeft="help" aria-label="Ajuda" />
        <Avatar name="Vitor Holtz" size="sm" />
      </div>
    </header>
  )
}
