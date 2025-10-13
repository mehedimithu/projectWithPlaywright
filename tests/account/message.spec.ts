import { test, expect } from "@playwright/test";
import { createAMessage } from "@datafactory/message";
import { LoginPage } from "@pages/login.page";
import { MessagesPage } from "@pages/messages.page";
import { credentials } from "@helpers/credentials";
import { ContactPage } from "@pages/contact.page";

test("Customer response to a message", async ({ page, context }) => {

    const messagesPage = new MessagesPage(page);
    const loginPage = new LoginPage(page);

    // Login to the system
    await loginPage.goto();
    await loginPage.loginIntoSystem(process.env.EMAIL, process.env.PASSWORD);
    await page.waitForTimeout(3000);

    // Create a message using the data factory function
    await test.step('Create a message through the datafactory', async () => {
        await createAMessage("Jane Doe", "payments", "Hello! This message is just for testing purposes to ensure everything is working correctly.",
            credentials().authToken).then(response => {
                console.log("Responses Body", response);
            });
    });

    // Use test.step to create a message through the contact page
    await test.step.skip('Create a message through the contact page.', async () => {
        const contactPage = new ContactPage(page);

        await contactPage.gotoContactPage();
        await page.waitForTimeout(2000);

        // Select "Customer service" from the Subject dropdown
        await contactPage.dropdownSubject.selectOption('payments');
        await contactPage.messageField.fill('Hello! This message is just for testing purposes to ensure everything is working correctly.');
        await contactPage.submitButton.click();

        await page.waitForTimeout(10000);

        // Validate result (example)
        await expect(contactPage.successMessage).toContainText('Thanks for your message! We will contact you shortly.');
    });


    // Navigate to the messages page
    await messagesPage.gotoMessagePage();
    await page.waitForTimeout(5000);

});