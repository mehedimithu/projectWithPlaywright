import { LoginPage } from "@pages/login.page";
import { test as setup, expect } from "@playwright/test";
import { credentials } from "@helpers/credentials";

const authFile = credentials().userAuthFile;

setup('auth', async ({ page }) => {

    //conts
    const login = new LoginPage(page);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // Perform login
    await login.goto();
    await login.login(email, password);

    await page.waitForTimeout(3000);

    // Verify successful login by checking for a specific element
    await expect(login.welcomeTitle).toBeVisible();

    // Save authentication state to a file
    await page.context().storageState({ path: authFile });

});