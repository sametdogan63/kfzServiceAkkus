import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { pageMetadata, publicPaths } from '../../src/config/pageMetadata.js'

test('public pages render without overflow, broken images or WCAG A/AA findings', async ({ page }, testInfo) => {
  const errors = []
  const requests = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('request', (request) => requests.push(request.url()))
  for (const path of publicPaths) {
    await page.goto(path)
    await expect(page.locator('h1')).toHaveCount(1)
    await page.evaluate(() => document.fonts.ready)
    await expect(page).toHaveTitle(new RegExp(pageMetadata[path].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
    const layout = await page.evaluate(() => ({
      width: document.documentElement.clientWidth,
      contentWidth: document.documentElement.scrollWidth,
      brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).map((image) => image.src)
    }))
    expect(layout.contentWidth, `Overflow on ${path}`).toBeLessThanOrEqual(layout.width + 1)
    expect(layout.brokenImages, `Images on ${path}`).toEqual([])
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
    expect(audit.violations, `Accessibility on ${path}`).toEqual([])
    if (['/', '/kontakt', '/termin'].includes(path)) {
      await page.screenshot({ path: testInfo.outputPath(`${path.slice(1) || 'home'}.png`), fullPage: true })
    }
  }
  expect(errors).toEqual([])
  expect(requests.filter((url) => /fonts\.(googleapis|gstatic)\.com/.test(url))).toEqual([])
})

test('navigation supports skip link, Escape, direct routes and legacy links', async ({ page, isMobile }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Zum Inhalt springen' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
  if (isMobile) {
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
    await expect(page.locator('#mobile-navigation a').first()).toBeFocused()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Menü öffnen' })).toBeFocused()
    await page.getByRole('button', { name: 'Menü öffnen' }).click()
  }
  await page.getByRole('navigation').getByRole('link', { name: 'Kontakt', exact: true }).filter({ visible: true }).click()
  await expect(page).toHaveURL(/\/kontakt$/)
  await expect(page.locator('main')).toBeFocused()
  await page.reload()
  await expect(page.getByRole('link', { name: 'Route planen' })).toBeVisible()
  await page.goto('/#/termin')
  await expect(page).toHaveURL(/\/termin$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Termin anfragen')
  await page.goto('/nicht-vorhanden')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Seite nicht gefunden')
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/)
})

test('key pages reflow at 320px and a 200-percent desktop zoom equivalent', async ({ page }) => {
  for (const width of [320, 720]) {
    await page.setViewportSize({ width, height: 700 })
    for (const path of ['/', '/kontakt', '/termin', '/datenschutz']) {
      await page.goto(path)
      await expect(page.locator('h1')).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1), `${path} at ${width}px`).toBe(true)
    }
  }
})

test('public pages contain content and metadata before JavaScript runs', async () => {
  for (const path of publicPaths) {
    const html = await readFile(`dist/${path === '/' ? 'index' : path.slice(1)}.html`, 'utf8')
    const rendered = new JSDOM(html)
    expect(rendered.window.document.querySelectorAll('main h1')).toHaveLength(1)
    expect(rendered.window.document.querySelector('meta[name="description"]').content).toBe(pageMetadata[path].description)
    expect(rendered.window.document.querySelector('#app').textContent.length).toBeGreaterThan(100)
    rendered.window.close()
  }
})

async function fillAppointment(page) {
  await page.goto('/termin')
  await page.getByLabel('Name *', { exact: true }).fill('Test Kunde')
  await page.getByLabel('E-Mail *', { exact: true }).fill('test@example.com')
  await page.getByLabel('Fahrzeugmarke *', { exact: true }).fill('Volkswagen')
  await page.getByRole('combobox', { name: 'Leistung *', exact: true }).selectOption('Inspektion')
  await page.locator('[aria-labelledby="appointment-date-label"] button[aria-pressed]:enabled').nth(1).click()
  await page.locator('[aria-labelledby="appointment-time-label"] button:enabled').first().click()
}

test('slow submissions are sent only once and optional data stays optional', async ({ page }) => {
  let releaseSubmission
  const pending = new Promise((resolve) => { releaseSubmission = resolve })
  const submissions = []
  await page.route('https://appointments.example/**', async (route) => {
    if (route.request().url().endsWith('/get_calendar_bookings')) {
      return route.fulfill({ json: [] })
    }
    if (route.request().url().endsWith('/submit_appointment')) {
      submissions.push(route.request().postDataJSON())
      await pending
      return route.fulfill({ json: { id: 'test-request-123' } })
    }
    return route.abort()
  })
  await fillAppointment(page)
  await page.getByRole('button', { name: 'Anfrage absenden' }).click()
  await expect(page.getByRole('button', { name: 'Wird gesendet' })).toBeDisabled()
  await page.locator('form').evaluate((form) => form.requestSubmit())
  await expect.poll(() => submissions.length).toBe(1)
  expect(submissions[0]).toMatchObject({ p_phone: null, p_model: null, p_year: null })
  releaseSubmission()
  await expect(page.getByRole('status').filter({ hasText: 'Ihre Anfrage wurde gesendet' })).toBeVisible()
  await expect(page.getByLabel('Name *', { exact: true })).toHaveValue('')
  expect(submissions).toHaveLength(1)
})

test('a newly occupied slot keeps customer input and refreshes availability', async ({ page }) => {
  let occupied = []
  await page.route('https://appointments.example/**', async (route) => {
    if (route.request().url().endsWith('/get_calendar_bookings')) return route.fulfill({ json: occupied })
    if (route.request().url().endsWith('/submit_appointment')) {
      const data = route.request().postDataJSON()
      occupied = [{ appointment_date: data.p_appointment_date, slot: data.p_slot, duration_minutes: data.p_duration_minutes }]
      return route.fulfill({ status: 409, json: { code: '23P01', message: 'Slot reserved' } })
    }
    return route.abort()
  })
  await fillAppointment(page)
  await page.getByRole('button', { name: 'Anfrage absenden' }).click()
  await expect(page.getByRole('alert')).toContainText('inzwischen reserviert')
  await expect(page.getByLabel('Name *', { exact: true })).toHaveValue('Test Kunde')
  await expect(page.locator('[aria-labelledby="appointment-time-label"] button').first()).toBeDisabled()
  await expect(page.getByRole('button', { name: 'Anfrage absenden' })).toBeEnabled()
})