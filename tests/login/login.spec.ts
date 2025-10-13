
import { test, expect } from "@playwright/test";
import { registerAUser } from "@datafactory/register";
import { LoginPage } from "@pages/login.page";
import { credentials } from "@helpers/credentials";
import { ContactPage } from "@pages/contact.page";
import { createAMessage } from "@datafactory/message";
import { getUserDetails } from "@datafactory/userData";
import { extractAuthToken } from "@helpers/get_token";


test.describe.configure({ mode: 'serial' });

test.describe("Login Tests", () => {

    test.skip("Register with a new user", async ({ page }) => {
        // Register a new user and wait for some time
        await registerAUser(credentials().email, credentials().password);
        await page.waitForTimeout(5000);
    });

    test("Login with exeting user and save auth file", async ({ page, context }) => {

        //conts 
        const login = new LoginPage(page);
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        // Perform login
        await login.goto();
        await login.loginIntoSystem(email, password);

        // Save authentication state to a file
        await page.context().storageState({ path: credentials().userAuthFile });
        await page.waitForTimeout(3000);

        // Verify successful login by checking for a specific element
        await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible();
        await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

        // Extract auth-token and save to a file
        const extractToken = await extractAuthToken(page, context, credentials().authToken);
        console.log('Extracted Token:', extractToken.token);

        await page.waitForTimeout(3000);

        // Use to get user details through the datafactory        
        await test.step('Get user details through the datafactory', async () => {
            getUserDetails(credentials().authToken).then(response => {
                console.log("User Details", response);
            });
        });

    });
});




