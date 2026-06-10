import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '@globo-ads/ds/global.css'
import App from './App'

if (import.meta.env.DEV) {
  void import('./data/validate').then(({ validateCatalogs }) => {
    const issues = validateCatalogs()
    if (issues.length > 0) {
      console.error(`[catálogos] drift de integridade detectado:\n- ${issues.join('\n- ')}`)
    }
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
