import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:4173',
    // локально берём установленный Chrome, в CI — браузер, который ставит `playwright install`
    launchOptions: process.env.PW_CHROME_PATH
      ? { executablePath: process.env.PW_CHROME_PATH, args: ['--no-sandbox'] }
      : {},
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
