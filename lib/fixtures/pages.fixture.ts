import { test as baseTest } from "@playwright/test";
import { LoginPage } from "@pages/login/login.page";
import { AccountPage } from "@pages/accounts/account.page";
import { ContactPage } from "@pages/contacts/contact.page";
import { MessagesPage } from "@pages/accounts/messages.page";
export {expect} from "@playwright/test";

type MyPages = {
    loginPage: LoginPage;
    accountPage: AccountPage;
    contactPage: ContactPage;
    messagesPage: MessagesPage;
};

export const test = baseTest.extend<MyPages>({

    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountPage: async ({ page }, use) => {
        await use(new AccountPage(page));
    },
    contactPage: async ({ page }, use) => {
        await use(new ContactPage(page));
    },
    messagesPage: async ({ page }, use) => {
        await use(new MessagesPage(page));
    }
});