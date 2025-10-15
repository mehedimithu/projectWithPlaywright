
import { test, expect } from "@fixtures/base.fixture";


test.describe.configure({ mode: 'serial' });

test.describe("Home Page Tests", () => {

    test("Verify products data in ui from API data", async ({ page, loginPage, homePage }) => {
        let products: any;

        await test.step.skip('Fetch products from API ', async () => {
            // Fetch products from API
            await page.route(`${process.env.API_URL}/products**`, async (route) => {
                const response = await route.fetch();
                products = (await response.json()).data;
                console.log("Products from API:", products);
                route.continue();
            }
            );
        });

        await test.step.skip('Verify the products from the ui ', async () => {

            const email = process.env.EMAIL;
            const password = process.env.PASSWORD;

            await loginPage.goto();
            await page.waitForTimeout(2000);
            await loginPage.loginIntoSystem(email, password);
            await page.waitForTimeout(2000);

            await homePage.navigateToHome();
            await page.waitForTimeout(8000);

            // Verify each product is visible on the page
            await expect(page.locator(".skeleton").first()).not.toBeVisible();
            const productLocator = homePage.productLocator;

            for (const product of products) {
                await expect(productLocator).toContainText(product.name)
                await expect(productLocator).toContainText(product.price.toString());

                const productCard = page.locator(`[data-test="product-${product.id}"]`);

                // Wait for this specific product card to be visible
                await expect(productCard).toBeVisible();
                // Verify product name (scoped to this card only)
                await expect(productCard.locator('[data-test="product-name"]')).toHaveText(product.name);
                // Optionally verify product price
                await expect(productCard).toContainText(product.price.toString());
            }
        });

        await test.step('Velideted the product data is visible through modified API', async () => {
            // Mocked products through API
            await page.route(`${process.env.API_URL}/products**`, async (route) => {
                const response = await route.fetch();
                const json = await response.json();

                json.data[0]["name"] = "Mocked Product";
                json.data[0]["price"] = 999.09;
                json.data[0]["in_stock"] = false;

                await route.fulfill({ response, json });
            }
            );
        });

        await test.step("Verify the Mocked products with the ui", async () => {
            await homePage.navigateToHome();
            await page.waitForTimeout(8000);

            const productLocator = homePage.productLocator;
            await expect(productLocator.getByRole('link').first()).toContainText("Mocked Product");
        });



    });
});