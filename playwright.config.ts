import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 2,
  timeout: 60000,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3102',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile-iPhone-13',
      use: { ...devices['iPhone 13'] },
    },
    {
      name: 'Mobile-Pixel-5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Tablet-iPad',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3102',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});

