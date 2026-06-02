import { test, expect } from '@playwright/test'

/**
 * Route smoke test.
 *
 * Discovers every routable page from the rendered sidebar — the same
 * `PAGES` registry that drives the router — then visits each route and
 * asserts it renders its `PageHeader` (`<h1>`) with no console/page errors.
 *
 * Reading routes from the live nav (instead of importing the registry, which
 * pulls in TSX + CSS modules Node can't parse) keeps the registry as the
 * single source of truth and validates the registry → nav → route wiring
 * end to end against the production build.
 */
test('every sidebar route renders without console errors', async ({ page }) => {
  const errors: string[] = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
  })
  page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))

  await page.goto('/')

  const nav = page.getByRole('navigation', { name: 'Navegação principal' })
  await expect(nav).toBeVisible()

  const hrefs = await nav
    .locator('a[href^="/"]')
    .evaluateAll((els) => [
      ...new Set(els.map((el) => (el as HTMLAnchorElement).getAttribute('href') ?? '')),
    ])

  // Guard against the discovery query silently returning nothing.
  expect(hrefs.length, 'sidebar should expose all routable pages').toBeGreaterThanOrEqual(30)

  for (const href of hrefs) {
    await test.step(`route ${href}`, async () => {
      await page.goto(href)
      await expect(page.locator('h1').first()).toBeVisible()
    })
  }

  expect(errors, `console/page errors detected:\n${errors.join('\n')}`).toEqual([])
})
