
import { test, expect } from "@fixtures/base.fixture";

test.describe.configure({ mode: 'serial' });

test.describe("Home Page Tests", () => {

    test.beforeEach("Login into the system", async ({ loginPage, page }) => {
        const email = process.env.EMAIL;
        const password = process.env.PASSWORD;

        await loginPage.goto();
        await loginPage.loginIntoSystem(email, password);
        await page.waitForTimeout(5000);

    });

    test.skip("Verify products data in ui from API data", async ({ page, loginPage, homePage }) => {
        let products: any;

        await test.step('Fetch products from API ', async () => {
            // Fetch products from API
            await page.route(`${process.env.API_URL}/products**`, async (route) => {
                const response = await route.fetch();
                products = (await response.json()).data;
                console.log("Products from API:", products);
                route.continue();
            }
            );
        });

        await test.step('Verify the products from the ui ', async () => {

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
            await expect(productLocator.getByRole('link').first()).toContainText("999.09");
            await expect(productLocator.getByRole('link').first()).toContainText("Out of stock");
        });
    });


    test.skip("Validate products data is loading from the Har file ", async ({ page, homePage }) => {

        await test.step("Mocked Products", async () => {
            await page.routeFromHAR(".hars/product.har", {
                url: `${process.env.API_URL}/products**`,
                update: true,
            });
        });

        await homePage.navigateToHome();
        await page.waitForTimeout(8000);

        const productLocator = homePage.productLocator;
        await expect(productLocator).toContainText("Combination Pliers");
        await expect(productLocator).toContainText("14.15");
    });

    test.skip("Check for broken images", async ({ page, homePage }) => {
        await homePage.navigateToHome();
        // await homePage.nevigateToWebsiteWithBugs();
        await page.waitForTimeout(2000);
        const brokenImages = await page.evaluate(() => {
            return Array.from(document.querySelectorAll("img"))
                .filter((img) => img.naturalWidth === 0 || img.naturalHeight === 0)
                .map((img) => img.src);
        });
        expect(brokenImages.length, `Broken Images: ${brokenImages}`).toBe(0);
    });

    test.skip("Verify the brands by intercepting network data", async ({ page, homePage }) => {
        let brands: any;

        // Fetch products from API
        await page.route(`${process.env.API_URL}/brands`, async (route) => {
            const response = await route.fetch();
            brands = await response.json();
            console.log("Brends from API:", brands);
            route.continue();
        });


        await homePage.navigateToHome();
        await page.waitForTimeout(2000);
        const productLocator = homePage.productLocator.locator('.container');
        await expect(productLocator).toBeVisible();

        await page.waitForTimeout(6000);
        const brandsFilterSection = homePage.filterSection;

        for (let brand of brands) {
            await expect(brandsFilterSection).toContainText(brand.name);
        }
    });

    test("Verify the category render in UI by mocked ", async ({ page, homePage }) => {
        let categories: any;

        await page.route(`${process.env.API_URL}/categories/tree`, async (route) => {
            const response = await route.fetch()
            const json = await response.json();
            categories = json.data;
            
            json[0].name = "Mocked Category"

            if (json[0].sub_categories && json[0].sub_categories.length > 0) {
                json[0].sub_categories[0].name = "Mocked Subcategory"
            }
            await route.fulfill({ response, json });
        });

       
        await homePage.navigateToHome();
        await page.waitForTimeout(5000);
        const categoryFilterSection = page.getByLabel("Mocked Category");
        await categoryFilterSection.check();
        await expect(categoryFilterSection).toBeChecked();

        await page.unrouteAll({ behavior: 'ignoreErrors' });

    });

});
