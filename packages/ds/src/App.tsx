import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './components/docs/Sidebar/Sidebar'
import { DEFAULT_PATH, PAGES } from './pages/registry'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <main className={styles.content}>
        <Suspense fallback={<div className={styles.pageFallback} />}>
          <Routes>
            <Route path="/" element={<Navigate to={DEFAULT_PATH} replace />} />
            {PAGES.filter((page) => page.component).map((page) => {
              const Page = page.component!
              return <Route key={page.path} path={page.path} element={<Page />} />
            })}
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}
