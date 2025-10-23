import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { page } from "../setup.steps";
import { LoginPage } from "../../pages/login.page";

let loginPage: LoginPage;

Given("the user is on the login page", async () => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

When("the user enters a valid username and password and clicks the login button", async () => {
    const email = "customer@practicesoftwaretesting.com";
    const password = "welcome01";
    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill(password);
    await loginPage.loginButton.click();
});

Then("the user should be redirected to the account page and a username should be displayed", async () => {
    await page.waitForTimeout(2000);
    await expect(loginPage.pageTitle).toContainText("My account");
    await expect(loginPage.userName).toBeVisible();
});



