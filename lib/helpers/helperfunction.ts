import { Page, expect, Dialog } from '@playwright/test';

/**
 * Dynamically handles one or more dialog events.
 * @param page - Playwright Page instance
 * @param dialogs - Array of dialogs to handle sequentially
 * Each dialog object includes expectedText and action
 */

export async function handleBagelDialogs(page: Page, bagelType: string) {
  let dialogCount = 0;

  page.on("dialog", async (dialog) => {
    dialogCount++;
    console.log(`Dialog ${dialogCount}: "${dialog.message()}"`);

    try {
      if (dialog.type() === "confirm") {
        expect(dialog.message()).toContain(`Add ${bagelType} bagel to cart?`);
        await dialog.accept();
      } else {
        expect(dialog.message()).toContain(`${bagelType} bagel added to cart!`);
        await dialog.dismiss();
      }
    } catch (err) {
      console.error(`Dialog ${dialogCount} failed:`, err);
      await dialog.dismiss(); // safe fallback
    }
  });
}