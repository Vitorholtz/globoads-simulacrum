import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      generateScopedName: (name: string, filename: string) => {
        const base = path.basename(filename, '.css').replace(/\.module$/, '')
        return `${base}__${name}`
      },
    },
  },
})
