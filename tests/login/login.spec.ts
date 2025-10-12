
import { test, expect } from "@playwright/test";
import { registerAUser } from "@datafactory/register";
import { LoginPage } from "@pages/login.page";
import { credentials } from "@helpers/credentials";

test.describe.configure({ mode: 'serial' });

test.describe("Login Tests", () => {

    test.skip("Register with a new user", async ({ page }) => {
        // Register a new user and wait for some time
        await registerAUser(credentials().email, credentials().password);
        await page.waitForTimeout(5000);
    });

    test("Login into the system nd save auth file", async ({ page }) => {

        //conts 
        const login = new LoginPage(page);

        // Perform login
        await login.goto();
        await login.login(credentials().email, credentials().password);

        // Save authentication state to a file
        await page.context().storageState({ path: credentials().userAuthFile });

        await page.waitForTimeout(3000);

        // Verify successful login by checking for a specific element
        await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible();

    });

});
