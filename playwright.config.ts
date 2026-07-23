import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;
const baseURL = `http://localhost:${PORT}`;

/**
 * Cross-device test config. The same specs run against a range of viewports
 * (phone → large desktop) so scaling/overflow regressions are caught everywhere.
 */
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  // All projects run on Chromium with explicit viewports, so a single browser
  // download covers phone → large desktop.
  projects: [
    {
      name: "mobile-small",
      use: {
        browserName: "chromium",
        viewport: { width: 320, height: 568 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "mobile",
      use: {
        browserName: "chromium",
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "tablet",
      use: {
        browserName: "chromium",
        viewport: { width: 768, height: 1024 },
        hasTouch: true,
      },
    },
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1280, height: 800 },
      },
    },
    {
      name: "desktop-xl",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
  webServer: {
    // Test against a production build: fast, no cold-compile flakiness, and
    // closest to what visitors actually get.
    command: `npm run build && npm run start -- -p ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
