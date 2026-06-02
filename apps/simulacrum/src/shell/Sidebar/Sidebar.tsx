import { NavLink } from 'react-router-dom'
import { NAV } from '../routes'
import styles from './Sidebar.module.css'

/** Navegação lateral persistente. Itens derivam de NAV (fonte única). */
export default function Sidebar() {
  return (
    <nav className={styles.sidebar} aria-label="Navegação principal">
      <ul className={styles.list}>
        {NAV.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }: { isActive: boolean }) =>
                ['type-body-sm', styles.item, isActive ? styles.active : ''].join(' ')
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  <span
                    className={`material-symbols-rounded icon-md ${isActive ? 'icon-filled' : ''}`}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
