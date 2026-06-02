import { Routes, Route } from 'react-router-dom'
import AppShell from './shell/AppShell'
import { NAV } from './shell/routes'
import HomePage from './features/home/HomePage'
import PlaceholderPage from './features/placeholder/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        {NAV.filter((item) => item.path !== '/').map((item) => (
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
