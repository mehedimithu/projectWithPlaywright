import { LoginPage } from '@pages/login.page';
import { test, expect } from '@playwright/test';

test.skip('test', async ({ page }) => {

  //conts
      const login = new LoginPage(page);
      const email = process.env.EMAIL;
      const password = process.env.PASSWORD;
  
      // Perform login
      await login.goto();
      await login.login(email, password);


  await page.waitForTimeout(7000);
      
  await page.getByRole('link', { name: 'Contact' }).click();

  await page.waitForTimeout(5000);

  // await page.locator('[data-test="first-name"]').click();
  // await page.locator('[data-test="first-name"]').fill('test');
  // await page.locator('[data-test="last-name"]').click();
  // await page.locator('[data-test="last-name"]').fill('qa');
  // await page.locator('[data-test="email"]').click();
  // await page.locator('[data-test="email"]').fill('me@gmail.com');

  
  await page.locator('[data-test="subject"]').selectOption('customer-service');
  await page.locator('[data-test="message"]').click();
  await page.locator('[data-test="message"]').fill('Hello! This message is just for testing purposes to ensure everything is working correctly.');
  await page.locator('[data-test="contact-submit"]').click();
  
  await page.waitForTimeout(5000);

  const successMessage = page.getByRole('alert', { name: 'Thanks for your message! We will contact you shortly.' });

  await expect(successMessage).toBeVisible();
});