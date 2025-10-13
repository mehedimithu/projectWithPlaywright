
import { Page } from "@playwright/test";

export class MessagesPage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async gotoMessagePage() {
        const baseUrl = 
        await this.page.goto(`${process.env.BASE_URL}/account/messages`);
    }

    // Message page related code
}