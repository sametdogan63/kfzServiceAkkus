import { expect, test } from '@playwright/test'
import { publicPaths } from '../../src/config/pageMetadata.js'

test.use({ baseURL: 'http://127.0.0.1:5181' })

test('production HTML hydrates on direct routes without broken assets', async ({ page }, testInfo) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  for (const path of publicPaths) {
    const response = await page.goto(path)
    expect(response.status()).toBe(200)
    expect(await response.text()).toContain('<h1')
    await expect(page.locator('h1')).toHaveCount(1)
    await page.evaluate(() => document.fonts.ready)
    expect(await page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
    if (['/', '/kontakt', '/termin'].includes(path)) {
      await page.screenshot({ path: testInfo.outputPath(`${path.slice(1) || 'home'}-viewport.png`), scale: 'css' })
    }
  }
  await page.goto('/#/kontakt')
  await expect(page).toHaveURL(/\/kontakt$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Kontakt und Anfahrt')
  expect(errors).toEqual([])
})