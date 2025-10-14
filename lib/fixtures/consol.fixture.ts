import { test as baseTest, expect as baseExpect, type Page, type ConsoleMessage } from "@playwright/test";

class PageConsol {
    readonly consoleMessages: ConsoleMessage[] = [];
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
        this.page.on('console', msg => {
            this.consoleMessages.push(msg);
        });
    }
}


export const test = baseTest.extend<{ consol: PageConsol }>({
    consol: async ({ page }, use) => {
        const console = new PageConsol(page);
        await use(console);
        await expect(console).toHaveNoConsoleErrors();
    },
});

export const expect = baseExpect.extend({
    async toHaveNoConsoleErrors(pageConsol: PageConsol) {
        const errorMessages = pageConsol.consoleMessages.filter(msg => msg.type() === 'error');
        if (errorMessages.length > 0) {
            return {
                pass: false,
                message: () => `Expected no console errors, but found:\n${errorMessages.map(msg => msg.text()).join('\n')}`,
            };
        }
        return {
            pass: true,
            message: () => 'No console errors found',
            name: 'toHaveNoConsoleErrors',
            actual: errorMessages,
            expected: 'No console errors',
        };
    },
});
