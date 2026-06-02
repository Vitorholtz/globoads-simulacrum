import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Source do Design System consumido diretamente (sem build intermediário).
const dsSrc = path.resolve(__dirname, '../../packages/ds/src').replace(/\\/g, '/')

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // `@globo-ads/ds`      → barrel (API pública)
      { find: /^@globo-ads\/ds$/, replacement: `${dsSrc}/index.ts` },
      // `@globo-ads/ds/...`  → subpaths (global.css, assets, tokens, etc.)
      { find: /^@globo-ads\/ds\//, replacement: `${dsSrc}/` },
    ],
    // Garante uma única instância de React/Router entre app e DS.
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  server: { port: 5174 },
  css: {
    modules: {
      // Mesmo padrão do DS para nomes de classe legíveis no DevTools.
      generateScopedName: (name: string, filename: string) => {
        const base = path.basename(filename, '.css').replace(/\.module$/, '')
        return `${base}__${name}`
      },
    },
  },
})
