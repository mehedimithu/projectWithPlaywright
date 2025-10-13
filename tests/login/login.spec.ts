
import { test, expect } from "@playwright/test";
import { registerAUser } from "@datafactory/register";
import { LoginPage } from "@pages/login.page";
import { credentials } from "@helpers/credentials";
import { ContactPage } from "@pages/contact.page";

test.describe.configure({ mode: 'serial' });

test.describe("Login Tests", () => {

    test.skip("Register with a new user", async ({ page }) => {
        // Register a new user and wait for some time
        await registerAUser(credentials().email, credentials().password);
        await page.waitForTimeout(5000);
    });

    test("Login with exeting user and save auth file", async ({ page }) => {

        //conts 
        const login = new LoginPage(page);
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        // Perform login
        await login.goto();
        await login.login(email, password);

        // Save authentication state to a file
        await page.context().storageState({ path: credentials().userAuthFile });
        await page.waitForTimeout(3000);

        // Verify successful login by checking for a specific element
        await expect(page.getByTitle('Practice Software Testing - Toolshop')).toBeVisible();
        await page.screenshot({ path: 'screenshots/login.png', fullPage: true });

        // Use test.step to create a message through the contact page
        await test.step('Create a message through the contact page.', async () => {
            const contactPage = new ContactPage(page);

            await contactPage.gotoContactPage();
            await page.waitForTimeout(2000);

            // Select "Customer service" from the Subject dropdown
            await contactPage.dropdownSubject.selectOption('customer-service');
            await contactPage.messageField.fill('Hello! This message is just for testing purposes to ensure everything is working correctly.');
            await contactPage.submitButton.click();

            await page.waitForTimeout(10000);

            // Validate result (example)
            await expect(contactPage.successMessage).toContainText('Thanks for your message! We will contact you shortly.' );
        });

    });



});
