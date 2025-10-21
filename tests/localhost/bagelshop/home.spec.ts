import { test, expect } from "@playwright/test";

test.describe("Bagel shop home page", async () => {

    test.beforeEach("Home title is visible", async ({ page }) => {
        await page.goto(`${process.env.LOCALHOST_URL}`, { waitUntil: "load" });
        await expect(page.getByText("The best bagels in town since 1995!")).toBeVisible();
    });

    test("Validate Promocode", async ({ page }) => {

        await test.step("Validate popup promocode text", async () => {

            const promocodeBtn = page.getByRole("button", { name: "Get Promo Code" });

            // ✅ Wait for popup while clicking the button
            const [popup] = await Promise.all([
                page.waitForEvent("popup"),
                promocodeBtn.click(),
            ]);

            await expect(popup.getByText("The promo code is:")).toBeVisible();
        });
    });
});
