import { defineConfig, devices, expect } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

const authFile = '.auth/customer01.json';

// function to ensure the auth directory exists
export const ensureAuthDirExists = () => {
  const fs = require('fs');
  const dir = path.dirname(authFile);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return true; // Directory was created
  }
  if (!fs.existsSync(authFile)) return true; // file missing, treat as empty

  const content = fs.readFileSync(authFile, 'utf-8').trim();
  return content.length === 0; // true if empty, false if has data
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  webServer: {
    command: "npm run start",
    port: 5173,
    timeout: 100 * 1000,
    reuseExistingServer: !process.env.CI
  },
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 6 * 60 * 1000, // 6 minutes
  expect: {
    timeout: 10000 // 10 seconds
  },
  use: {
    //storageState: '.auth/customer.json', // <— load cookies automatically
    baseURL: process.env.BASE_URL,
    // headless: true,
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    ...(ensureAuthDirExists() ? [{ name: 'setup', testMatch: authFile }] : []),
    // conditionally add the auth project
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
        //viewport: {width: 900, height: 720},
        permissions: ['clipboard-read']
      },
      dependencies: ensureAuthDirExists() ? ['setup'] : []
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 10'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 16'] },
    },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

expect.extend({
  toBeNumber(received: any) {
    const pass = typeof received === 'number';
    if (pass) {
      return {
        message: () => `expected ${received} not to be a number`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected result ${received} is not a number`,
        pass: false,
      };
    }
  },
});