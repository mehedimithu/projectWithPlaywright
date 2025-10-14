import { LoginPage } from "@pages/login/login.page";
import { test as setup, expect } from "@playwright/test";
import { credentials } from "@helpers/credentials";
import { extractAuthToken } from "@helpers/get_token";
import { getUserDetails } from "@datafactory/userData";

const authFile = credentials().authToken;

setup('auth', async ({ page, context }) => {

    //conts
    const login = new LoginPage(page);
    const email = process.env.EMAIL;
    const password = process.env.PASSWORD;

    // Perform login
    await login.goto();
    await login.loginIntoSystem(email, password);

    await page.waitForTimeout(3000);

    // Verify successful login by checking for a specific element
    await expect(login.welcomeTitle).toBeVisible();

    // Save authentication state to a file
    // await page.context().storageState({ path: authFile });

    // Extract auth-token and save to a file
    const extractToken = await extractAuthToken(page, context, credentials().authToken);
    console.log('Extracted Token:', extractToken.token);

    await page.waitForTimeout(5000);

    // Use to get user details through the datafactory        
    await getUserDetails(credentials().authToken).then(response => {
        console.log("User Details", response);
    });

});


