import { Page, Locator } from "@playwright/test";

export class AccountPage {
    readonly page: Page;
    readonly navMenu: Locator;
    readonly accountTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navMenu = page.getByTestId("nav-menu");
        this.accountTitle = page.getByRole('heading', { name: 'My Account' });
    }

    async gotoAccountPage() {
        const baseUrl = process.env.BASE_URL
        // await this.page.goto(baseUrl + "/account");
    }
}   