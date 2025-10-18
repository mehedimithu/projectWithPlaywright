import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly productLocator: Locator
    readonly filterSection: Locator


    constructor(page: Page) {
        this.page = page;
        this.productLocator = page.locator('.col-md-9');
        this.filterSection = page.getByText("SortName (A-Z)Name (Z-A)");
    }

    async navigateToHome() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    async nevigateToWebsiteWithBugs() {
        await this.page.goto(`${process.env.WITHBUGS_URL}`);
    }


}