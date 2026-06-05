import { Routes, Route } from 'react-router-dom'
import AppShell from './shell/AppShell'
import { NAV } from './shell/routes'
import HomePage from './features/home/HomePage'
import PlaceholderPage from './features/placeholder/PlaceholderPage'
import CompraDiariasPage from './features/compra-diarias/CompraDiariasPage'

const FEATURE_ROUTES = new Set(['/compra-diarias'])

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/compra-diarias" element={<CompraDiariasPage />} />
        {NAV.filter((item) => item.path !== '/' && !FEATURE_ROUTES.has(item.path)).map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={<PlaceholderPage title={item.label} icon={item.icon} />}
          />
        ))}
      </Route>
    </Routes>
  )
}
