import { type Page, type Locator } from "@playwright/test";

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly menuButton: Locator;
    readonly pageTitle: Locator;
    readonly userName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Your email');
        this.passwordInput = page.getByPlaceholder('Your password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.menuButton = page.getByTestId('nav-menu');
        this.pageTitle = page.locator('[data-test="page-title"]');
        this.userName = page.locator('a.nav-link', { hasText: 'Jane Doe' });
    }

    async goto() {
        const baseUrl = "https://practicesoftwaretesting.com"
        await this.page.goto(baseUrl + "/auth/login");
    }

    async loginIntoSystem(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
