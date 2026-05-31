import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright smoke-test config.
 *
 * Runs against the production *preview* build (not the dev server) so the
 * smoke test also exercises the route-based lazy chunks emitted by Vite.
 * Vitest owns `src/**` unit tests; Playwright owns `e2e/**` (see `vitest.config.ts`
 * which excludes `e2e/**`).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm build && pnpm exec vite preview --port 4173 --strictPort',
    url: 'http://localhost:4173',
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
})
