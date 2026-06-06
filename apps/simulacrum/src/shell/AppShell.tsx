import { useEffect, useRef, useState, useCallback } from 'react'
import { Outlet } from 'react-router-dom'
import { Toast } from '@globo-ads/ds'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'
import { useIsMobile } from '../hooks/useIsMobile'
import { useCart } from '../cart/CartContext'
import styles from './AppShell.module.css'

type SidebarMode = 'closed' | 'push' | 'overlay'

const DISMISS_MS = 4000
const EXIT_MS = 250

export default function AppShell() {
  const [mode, setMode] = useState<SidebarMode>('closed')
  const { toast, dismissToast } = useCart()
  const [leaving, setLeaving] = useState(false)
  const toastLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sidebarCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isMobile = useIsMobile()

  // ── Toast lifecycle ──

  const startExit = useCallback(() => {
    setLeaving(true)
    toastLeaveTimer.current = setTimeout(() => {
      dismissToast()
      setLeaving(false)
    }, EXIT_MS)
  }, [dismissToast])

  useEffect(() => {
    if (!toast) return
    const resetTimer = setTimeout(() => setLeaving(false), 0)
    if (toastLeaveTimer.current) clearTimeout(toastLeaveTimer.current)
    const timer = setTimeout(startExit, DISMISS_MS)
    return () => {
      clearTimeout(resetTimer)
      clearTimeout(timer)
    }
  }, [toast, startExit])

  useEffect(
    () => () => {
      if (toastLeaveTimer.current) clearTimeout(toastLeaveTimer.current)
    },
    []
  )

  // ── Sidebar hover/pin logic ──

  function cancelSidebarClose() {
    if (sidebarCloseTimer.current !== null) {
      clearTimeout(sidebarCloseTimer.current)
      sidebarCloseTimer.current = null
    }
  }

  function scheduleClose() {
    if (isMobile) return
    cancelSidebarClose()
    sidebarCloseTimer.current = setTimeout(() => {
      setMode((prev) => (prev === 'push' ? prev : 'closed'))
    }, 150)
  }

  function openHover() {
    if (isMobile) return
    cancelSidebarClose()
    setMode((prev) => (prev === 'push' ? prev : 'overlay'))
  }

  function togglePin() {
    cancelSidebarClose()
    if (isMobile) {
      setMode((prev) => (prev === 'closed' ? 'overlay' : 'closed'))
    } else {
      setMode((prev) => (prev === 'push' ? 'closed' : 'push'))
    }
  }

  function closeOverlay() {
    cancelSidebarClose()
    setMode((prev) => (prev === 'push' ? prev : 'closed'))
  }

  const sidebarOpen = mode !== 'closed'

  useEffect(() => {
    const shouldLock = isMobile && mode !== 'closed'
    document.body.style.overflow = shouldLock ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, mode])

  function handleNavigate() {
    if (isMobile) closeOverlay()
  }

  return (
    <div className={styles.shell}>
      {toast && (
        <div className={[styles.toastArea, leaving && styles.leaving].filter(Boolean).join(' ')}>
          <Toast
            type="success"
            title={toast.title}
            description={toast.description}
            onClose={startExit}
          />
        </div>
      )}
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
            onMouseEnter={cancelSidebarClose}
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
