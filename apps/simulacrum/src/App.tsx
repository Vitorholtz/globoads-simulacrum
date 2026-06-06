import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import AppShell from './shell/AppShell'
import { NAV } from './shell/routes'
import { FEATURES } from './shell/features'
import PlaceholderPage from './features/placeholder/PlaceholderPage'

const FEATURE_PATHS = new Set(FEATURES.map((f) => f.path))

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route element={<AppShell />}>
          {FEATURES.map(({ path, component: Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          {NAV.filter((item) => !FEATURE_PATHS.has(item.path)).map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<PlaceholderPage title={item.label} icon={item.icon} />}
            />
          ))}
        </Route>
      </Routes>
    </CartProvider>
  )
}
