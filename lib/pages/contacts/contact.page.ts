import { type Page, type Locator } from "@playwright/test";

export class ContactPage {
    readonly page: Page;
    readonly contactButton: Locator
    readonly welcomeTitle: Locator
    readonly dropdownSubject: Locator
    readonly messageField: Locator
    readonly submitButton: Locator
    readonly successMessage: Locator


    constructor(page: Page) {
        this.page = page;
        this.contactButton = page.getByRole('link', { name: 'Contact' });
        this.dropdownSubject = page.locator('[data-test="subject"]');
        this.messageField = page.locator('[data-test="message"]');
        this.submitButton = page.locator('[data-test="contact-submit"]');
        this.successMessage = page.locator('.alert-success');
    }

    async gotoContactPage() {
        // Navigate to contact page
        await this.page.goto(process.env.BASE_URL + '/contact');
    }



}