import { test, expect } from "@playwright/test";

test.describe("Bagel shop home page", async () => {

    test.beforeEach("Home title is visible", async ({ page }) => {
        await page.goto(`${process.env.LOCALHOST_URL}`, { waitUntil: "load" });
        await expect(page.getByText("The best bagels in town since 1995!")).toBeVisible();
    });

    test("Contect Page", async ({ page }) => {
        await test.step.skip("Validate popup promocode text", async () => {

            await page.goto(`${process.env.LOCALHOST_URL}`, { waitUntil: "load" });

            const promocodeBtn = page.getByRole("button", { name: "Get Promo Code" });

            // ✅ Wait for popup while clicking the button
            const [popup] = await Promise.all([
                page.waitForEvent("popup"),
                promocodeBtn.click(),
            ]);

            await expect(popup.getByText("The promo code is:")).toBeVisible();
        });

        await test.step("Verify the contact message to send options", async () => {
            const contactLink = page.getByRole('link', { name: 'Contact' });
            const nameInput = page.locator('#name');
            const emailInput = page.locator('#email');
            const messageInput = page.locator('#message');
            const sendBtn = page.getByRole('button', { name: 'Send Message' });

            await contactLink.click();
            await page.waitForTimeout(2000);

            await nameInput.fill("QA TESTER");
            await emailInput.fill("qa@test.com");
            await messageInput.fill("I am testing the message opiton is working or not.");
            await sendBtn.click();

            // Listen for the popup before the action
            page.once('dialog', async (dialog) => {
                expect(dialog.message()).toContain('Send this message?');
                await dialog.accept(); // or dialog.dismiss();
            });

            //Sent message susscefully 
            page.once('dialog', async (dialog) => {
                expect(dialog.message()).toContain('Message sent successfully!');
                await dialog.dismiss();
            });

        });
    });
});
