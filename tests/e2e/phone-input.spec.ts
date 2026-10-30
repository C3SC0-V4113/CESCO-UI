import { expect, test } from '@playwright/test';

test('phone input formats a number and emits E.164 for every base', async ({ page }) => {
  const runtimeErrors: string[] = [];
  page.on('pageerror', (error) => runtimeErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') runtimeErrors.push(message.text());
  });
  await page.goto('/components/phone-input');
  for (const base of ['base', 'radix', 'aria']) {
    await page.getByRole('combobox', { name: 'Select component base' }).selectOption(base);
    const countryTrigger = page.locator('[aria-label="Country"]').nth(1);
    await countryTrigger.focus();
    await countryTrigger.press('ArrowDown');
    const countrySearch = page.getByPlaceholder('Search country');
    await expect(countrySearch).toBeVisible();
    await countrySearch.fill('United States');
    await countrySearch.press('ArrowDown');
    await countrySearch.press('Enter');
    await expect(countryTrigger).toContainText('+1');
    await page.keyboard.press('Escape');
    await page.getByRole('textbox', { name: 'Phone number (all countries)' }).fill('74920123');
    await expect(page.getByText('E.164: +50374920123')).toBeVisible();
  }
  expect(runtimeErrors).toEqual([]);
});
