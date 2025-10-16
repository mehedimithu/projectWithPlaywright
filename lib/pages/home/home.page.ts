import { Page, Locator } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly productLocator: Locator


    constructor(page: Page) {
        this.page = page;
        this.productLocator = page.locator('.col-md-9');
    }

    async navigateToHome() {
        await this.page.goto(`${process.env.BASE_URL}`);
    }

    async nevigateToWebsiteWithBugs(){
        await this.page.goto(`${process.env.WITHBUGS_URL}`);
    }

   
}