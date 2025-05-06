import { test, expect } from "@playwright/test";

test.describe("Template to Builder Flow", () => {
  test("should complete full flow from template selection to download", async ({ page }) => {
    // Enable debug logs
    page.on("console", (msg) => console.log(`Browser console: ${msg.text()}`));
    page.on("pageerror", (err) => console.log(`Browser error: ${err.message}`));

    // 1. Start at home page and wait for it to load
    console.log("Navigating to home page...");
    await page.goto("/");

    // Wait for the page to be fully loaded
    console.log("Waiting for page to load...");
    await page.waitForLoadState("networkidle");

    // Debug: Log current URL
    console.log("Current URL:", await page.url());

    // Debug: Log page content
    const content = await page.content();
    console.log("Page content:", content);

    // Debug: Check if any elements with data-testid exist
    const allTestIds = await page.$$("[data-testid]");
    console.log("Found elements with data-testid:", allTestIds.length);
    for (const el of allTestIds) {
      const testId = await el.getAttribute("data-testid");
      console.log("Found data-testid:", testId);
    }

    // Wait for template cards to be visible with increased timeout
    console.log("Waiting for template cards...");
    try {
      await page.waitForSelector('[data-testid="template-card"]', {
        state: "visible",
        timeout: 10000,
      });
    } catch (error) {
      console.error("Failed to find template cards:", error);
      // Take screenshot for debugging
      await page.screenshot({ path: "e2e/screenshots/template-cards-not-found.png" });
      throw error;
    }

    // Verify template cards
    const templateCards = page.locator('[data-testid="template-card"]');
    const count = await templateCards.count();
    console.log("Found template cards:", count);
    expect(count).toBe(2); // Verify exactly 2 template cards

    // 2. Select first template and wait for context update
    console.log("Selecting first template...");
    await templateCards.first().click();

    // Wait for network to be idle after click
    await page.waitForLoadState("networkidle");

    // Wait for any animations to complete
    await page.waitForTimeout(500);

    // Take screenshot after selecting template
    console.log("Taking screenshot after template selection...");
    await page.screenshot({ path: "e2e/screenshots/after-template-selection.png", fullPage: true });

    // 3. Wait for builder page to load
    console.log("Waiting for builder page...");
    await page.waitForSelector('[data-testid="builder-page"]', { timeout: 10000 });

    // Debug: Log all data-testid elements after builder page loads
    console.log("Checking elements after builder page loads...");
    const builderTestIds = await page.$$("[data-testid]");
    console.log("Found elements with data-testid:", builderTestIds.length);
    for (const el of builderTestIds) {
      const testId = await el.getAttribute("data-testid");
      console.log("Found data-testid:", testId);
    }

    // Debug: Check if heading element exists in DOM
    const headingExists = await page.evaluate(() => {
      const heading = document.querySelector('[data-testid="heading-element"]');
      return !!heading;
    });
    console.log("Heading element exists in DOM:", headingExists);

    // Debug: Check heading element visibility
    const headingVisible = await page.evaluate(() => {
      const heading = document.querySelector('[data-testid="heading-element"]');
      if (!heading) return false;
      const style = window.getComputedStyle(heading);
      return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
    });
    console.log("Heading element is visible:", headingVisible);

    // 4. Edit content
    console.log("Editing content...");
    // Wait for heading element to be visible
    console.log("Waiting for heading element...");
    await page.waitForSelector('[data-testid="heading-element"]', { timeout: 10000 });

    // Edit heading
    const heading = page.locator('[data-testid="heading-element"]').first();
    await heading.click();

    // Wait for input field to appear
    console.log("Waiting for content textarea...");
    await page.waitForSelector('[data-testid="content-textarea"]', { timeout: 10000 });
    const headingInput = page.locator('[data-testid="content-textarea"]');
    await headingInput.fill("New Heading Text");

    // Edit paragraph
    console.log("Waiting for paragraph element...");
    await page.waitForSelector('[data-testid="paragraph-element"]', { timeout: 10000 });
    const paragraph = page.locator('[data-testid="paragraph-element"]').first();
    await paragraph.click();

    // Wait for input field to appear
    const paragraphInput = page.locator('[data-testid="content-textarea"]');
    await paragraphInput.fill("New paragraph content");

    // Take screenshot after editing content
    console.log("Taking screenshot after editing content...");
    await page.screenshot({ path: "e2e/screenshots/after-editing-content.png", fullPage: true });

    // 5. Click export button to download
    console.log("Clicking export button to download...");

    // Set up download listener before clicking
    const downloadPromise = page.waitForEvent("download", { timeout: 10000 });

    // Wait for export button to be visible
    console.log("Waiting for export button...");
    await page.waitForSelector('[data-testid="export-button"]', { timeout: 10000 });
    const exportButton = page.locator('[data-testid="export-button"]');
    await exportButton.click();

    // Take screenshot after clicking export
    console.log("Taking screenshot after clicking export...");
    await page.screenshot({ path: "e2e/screenshots/after-clicking-export.png", fullPage: true });

    // Wait for download to start
    console.log("Waiting for download to start...");
    const download = await downloadPromise;

    // Debug: Log download info
    console.log("Download started:", download.suggestedFilename());

    // Verify download filename
    expect(download.suggestedFilename()).toBe("template.html");

    // 6. Verify builder is still visible after download
    console.log("Verifying builder visibility after download...");
    await expect(page.locator('[data-testid="builder-page"]')).toBeVisible();
  });
});
