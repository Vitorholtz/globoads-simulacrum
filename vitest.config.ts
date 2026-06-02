import { defineConfig, configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    // e2e/** is Playwright's; keep it out of the Vitest run.
    exclude: [...configDefaults.exclude, 'e2e/**'],
    setupFiles: ['./src/test/setup.ts'],
    tsconfig: resolve(__dirname, './tsconfig.test.json'),
    css: {
      modules: {
        // Return plain class names (no hash) so tests can assert e.g. 'neutral' not '_neutral_abc123'
        classNameStrategy: 'non-scoped',
      },
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/pages/**', 'src/test/**', 'src/main.tsx'],
      thresholds: {
        lines: 60,
        functions: 60,
      },
    },
  },
})
