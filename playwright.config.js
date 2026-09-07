import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  globalTimeout: 180000,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/report.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:5179',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure'
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } }
  ],
  webServer: [{
    command: `"${process.execPath}" node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5179 --strictPort --mode test`,
    url: 'http://127.0.0.1:5179',
    reuseExistingServer: false,
    env: {
      VITE_SUPABASE_URL: 'https://appointments.example',
      VITE_SUPABASE_ANON_KEY: 'test-public-key',
      VITE_SITE_URL: 'https://workshop.example',
      VITE_NOINDEX: 'true'
    }
  }, {
    command: `"${process.execPath}" node_modules/vite/bin/vite.js preview --host 127.0.0.1 --port 5181 --strictPort`,
    url: 'http://127.0.0.1:5181',
    reuseExistingServer: false
  }]
})