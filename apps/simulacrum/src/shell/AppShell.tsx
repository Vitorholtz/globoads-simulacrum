import { useEffect, useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { useIsMobile } from '../hooks/useIsMobile'
import styles from './AppShell.module.css'

type SidebarMode = 'closed' | 'push' | 'overlay'

export default function AppShell() {
  const [mode, setMode] = useState<SidebarMode>('closed')
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = useIsMobile()

  function cancelClose() {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function scheduleClose() {
    if (isMobile) return
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setMode((prev) => (prev === 'push' ? prev : 'closed'))
    }, 150)
  }

  function openHover() {
    if (isMobile) return
    cancelClose()
    setMode((prev) => (prev === 'push' ? prev : 'overlay'))
  }

  function togglePin() {
    cancelClose()
    if (isMobile) {
      setMode((prev) => (prev === 'closed' ? 'overlay' : 'closed'))
    } else {
      setMode((prev) => (prev === 'push' ? 'closed' : 'push'))
    }
  }

  const sidebarOpen = mode !== 'closed'

  useEffect(() => {
    const shouldLock = isMobile && mode !== 'closed'
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, mode])

  function closeOverlay() {
    cancelClose()
    setMode((prev) => (prev === 'push' ? prev : 'closed'))
  }

  function handleNavigate() {
    if (isMobile) closeOverlay()
  }

  return (
    <div className={styles.shell}>
      <Header
        sidebarPinned={mode === 'push'}
        onMenuClick={togglePin}
        onMenuHoverEnter={openHover}
        onMenuHoverLeave={scheduleClose}
      />
      <div className={styles.body}>
        <div
          className={`${styles.backdrop} ${mode === 'overlay' ? styles.backdropVisible : ''}`}
          onClick={closeOverlay}
          aria-hidden="true"
        />
        <div
          className={`${styles.sidebarWrapper} ${sidebarOpen ? styles.sidebarWrapperVisible : ''}`}
        >
          <Sidebar
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            onNavigate={handleNavigate}
          />
        </div>
        <div className={styles.edgeTrigger} onMouseEnter={openHover} onMouseLeave={scheduleClose} />
        <main className={`${styles.main} ${mode === 'push' ? styles.pushed : ''}`}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
