
import { handleBagelDialogs } from "@helpers/helperfunction";
import { test, expect } from "@playwright/test";

test.describe("Menu Page", async () => {
    test.beforeEach("Home title is visible", async ({ page }) => {
        await page.goto(`${process.env.LOCALHOST_URL}`, { waitUntil: "load" });
        await expect(page.getByText("The best bagels in town since 1995!")).toBeVisible();
    });

    const bagelType = "Sesame";

    test(`Add ${bagelType} bagels to the Cart`, async ({ page }) => {

        const menuLink = page.getByRole('link', { name: 'Menu' });
        await menuLink.click();
        await page.waitForTimeout(2000);

        await handleBagelDialogs(page, bagelType);

        // const table = page.locator("#menuTable");
        // const tableRows = table.getByRole("row", { name: bagelType });
        // const addToCartBtn = tableRows.getByRole("button", { name: "Add to Cart" });
        // await addToCartBtn.click();

        await page.getByRole("row", { name: new RegExp(`^${bagelType}`) }).getByRole("button").click();
    });
});
