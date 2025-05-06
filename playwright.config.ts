import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:5173" },
    },
  ],
});
