import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Your email');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    async goto() {
        const baseUrl = process.env.BASE_URL
        await this.page.goto(baseUrl + "/auth/login");
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
