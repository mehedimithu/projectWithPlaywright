
import { test, expect } from "@fixtures/base.fixture";
import { registerAUser } from "@datafactory/register";
import { credentials } from "@helpers/credentials";
import { extractAuthToken } from "@helpers/get_token";


test.describe.configure({ mode: 'serial' });

test.describe("Login Tests", () => {

    test.skip("Register with a new user", async ({ page }) => {
        // Register a new user and wait for some time
        await registerAUser(credentials().email, credentials().password);
        await page.waitForTimeout(5000);
    });

    test("Login with exeting user and save auth file", async ({ page, loginPage, context }) => {
        //conts 
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        // Perform login
        await loginPage.goto();
        await loginPage.loginIntoSystem(email, password);

        // Save authentication state to a file
        await page.context().storageState({ path: credentials().userAuthFile });
        await page.waitForTimeout(3000);

        // Verify successful login by checking for a specific element
        await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible();
        await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

        // Extract auth-token and save to a file
        const extractToken = await extractAuthToken(page, context, credentials().authToken);
        console.log('Extracted Token:', extractToken.token);

    });
});




