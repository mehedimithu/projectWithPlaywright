import {type Page, type Locator } from "@playwright/test";

export class ContactPage {
    readonly page: Page;
    readonly contactButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.contactButton = page.getByRole('link', { name: 'Contact' });
    }



}