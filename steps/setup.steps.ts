
import { Before, After } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";

let browser: Browser;
let page: Page;

Before(async () => {
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
});

After(async () => {
    await page.close();
    await browser.close();
});

export { browser, page };