import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

test.describe("Bagel Shop Order Page", async () => {

    test.beforeEach("Home title is visible", async ({ page }) => {
        await page.goto(`${process.env.LOCALHOST_URL}`, { waitUntil: "load" });
        await expect(page.getByText("The best bagels in town since 1995!")).toBeVisible();
    });


    test("Order Page", async ({ page }) => {

        const orderPage = page.getByRole('link', { name: 'Order' });
        const uploadFile = page.locator('#designUpload');
        const instructionsInput = page.locator('#instructions');
        const quantityInput = page.locator('#quantity');
        const placeOrderBtn = page.getByRole('button', { name: 'Place Order' });
        const downloadBtn = page.getByRole('button', { name: 'Download Receipt' });
        const fileName = '\"image-file copy.png\"';

        // Go to order page
        await orderPage.click();

        // Upload and fill inputs
        await uploadFile.setInputFiles('lib/uploads/image-file copy.png');
        await instructionsInput.fill('Special Instructions');
        await quantityInput.fill('5');

        // Attach dialog listener before clicking
        page.once('dialog', async (dialog) => {
            expect(dialog.message()).toContain(`File ${fileName} uploaded successfully!`);
            await dialog.accept();
        });

        await placeOrderBtn.click();

        // Prepare to wait for the download event
        const downloadPromise = page.waitForEvent('download');

        // Trigger the download
        await downloadBtn.click();

        // Wait for and save the file
        const download = await downloadPromise;
        const downloadPath = path.join(__dirname, download.suggestedFilename());
        await download.saveAs(downloadPath);

        // Verify or read the downloaded file
        const fileContent = fs.readFileSync(downloadPath, 'utf8');
        console.log('Downloaded content:', fileContent);

        // Optionally verify file exists
        expect(fs.existsSync(downloadPath)).toBeTruthy();

        fs.unlinkSync(downloadPath);

    });

})