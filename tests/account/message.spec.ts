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
    await test.step.skip('Create a message through the datafactory', async () => {
        await createAMessage("Jane Doe", "payments", "Hello! This message is just for testing purposes to ensure everything is working correctly.",
            credentials().authToken).then(response => {
                console.log("Responses Body", response);
            });
    });

    // Use test.step to create a message through the contact page
    await test.step('Create a message through the contact page.', async () => {
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
    await page.waitForTimeout(7000);

    await expect(messagesPage.table).toBeVisible();
    const rowCount = await messagesPage.rows.count();
    console.log("Total number of messages:", rowCount);
   // await expect(messagesPage.rows).toHaveCount(1);

    // Click on the Details link of the first message
    await messagesPage.detailsLink.first().click();
    await page.waitForTimeout(5000);

    // Validate message card details
    await expect(messagesPage.card).toBeVisible();
    await expect(messagesPage.messageHeader).toBeVisible();
    await expect(messagesPage.messageBadge).toBeVisible();
    await expect(messagesPage.messagebody).toBeVisible();

    await page.waitForTimeout(5000);

    // Reply to the message
    await expect(messagesPage.messageBox).toBeVisible({ timeout: 5000 });
    await messagesPage.messageBox.fill("This is a reply to your message. We have received your inquiry and will get back to you shortly.");
    await messagesPage.replyButton.click();
    await page.waitForTimeout(5000);

    // Validate the reply is added to the reply list    
    await expect(messagesPage.replyList).toContainText("This is a reply to your message. We have received your inquiry and will get back to you shortly.");



});