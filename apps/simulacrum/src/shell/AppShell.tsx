import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'
import styles from './AppShell.module.css'

/** Layout persistente do produto: Header no topo, Sidebar à esquerda, conteúdo (Outlet) e Footer. */
export default function AppShell() {
  return (
    <div className={styles.shell}>
      <Header />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.main}>
          <div className={styles.content}>
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
