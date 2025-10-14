
import { type Page, type Locator } from "@playwright/test";

export class MessagesPage {

    readonly page: Page;
    readonly detailsLink: Locator;
    readonly table: Locator;
    readonly rows: Locator;
    readonly card: Locator;
    readonly messageHeader: Locator;
    readonly messageBadge: Locator;
    readonly messagebody: Locator;
    readonly messageBox: Locator;
    readonly replyButton: Locator;
    readonly replyList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.detailsLink = page.getByRole('link', { name: 'Details' });
        this.table = page.locator('table.table.table-hover');
        this.rows = page.locator('table.table.table-hover').locator('tbody tr');
        this.card = page.locator('div.card.bg-secondary.text-white.mb-3');
        this.messageHeader = page.locator('div.card.bg-secondary.text-white.mb-3').locator('.card-header');
        this.messageBadge = page.locator('div.card.bg-secondary.text-white.mb-3').locator('.card-header').locator('span.badge.rounded-pill.bg-info');
        this.messagebody = page.locator('div.card.bg-secondary.text-white.mb-3').locator('.card-body .card-text');
        this.replyList = page.getByRole("heading", { name: "Replies" }).locator("+ div.card");
        this.messageBox = page.locator('[data-test="message"]');
        //page.getByTestId('message');
        //page.locator('.card:has-text("Add Reply")')
        this.replyButton = page.locator('[data-test="reply-submit"]');
        //page.getByTestId('reply-submit');
    }

    async gotoMessagePage() {
        const baseUrl =
            await this.page.goto(`${process.env.BASE_URL}/account/messages`);
    }

    // Message page related code
}