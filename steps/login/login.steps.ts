import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { Page, Browser, chromium, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";

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

Given("the user is on the login page", async () => {
    await page.goto("https://practicesoftwaretesting.com/auth/login", { waitUntil: 'load' });
});

When("the user enters a valid username and password", async () => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    const emailInput = page.getByPlaceholder('Your email');
    const passwordInput = page.getByPlaceholder('Your password');

    await emailInput.fill(email);
    await passwordInput.fill(password);

});
When("the user clicks the login button", async () => {
    const loginButton = page.getByRole('button', { name: 'Login' });
    // The login button click is already handled in the previous step.
    await loginButton.click();
});

Then("the user should be redirected to the account page", async () => {

    await page.waitForTimeout(2000); // Wait for navigation to complete
    const pageTitle = page.locator('[data-test="page-title"]');
    await expect(pageTitle).toContainText("My account");
});


Then("a username Jane Doe should be displayed", async () => {
      const userMenu = page.getByTestId('nav-menu');
  await expect(userMenu).toHaveText('Jane Doe', { timeout: 10000 });
});
