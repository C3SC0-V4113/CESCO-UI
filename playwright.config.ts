import { defineConfig, devices } from '@playwright/test';

const defaultPort = 3100;
const e2ePortValue = process.env.E2E_PORT;
const e2ePort =
  e2ePortValue === undefined || e2ePortValue === '' ? defaultPort : Number(e2ePortValue);

if (
  e2ePortValue !== undefined &&
  e2ePortValue !== '' &&
  (!/^\d+$/.test(e2ePortValue) || !Number.isInteger(e2ePort) || e2ePort < 1 || e2ePort > 65_535)
) {
  throw new Error('E2E_PORT must be an integer from 1 to 65535.');
}

const baseUrl = `http://127.0.0.1:${e2ePort}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: baseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --hostname 127.0.0.1 --port ${e2ePort}`,
    url: baseUrl,
    reuseExistingServer: false,
    timeout: 600_000,
    env: { ...process.env, PLAYWRIGHT_E2E: '1' },
  },
});
