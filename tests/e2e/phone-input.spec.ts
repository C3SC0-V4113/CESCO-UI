import { expect, test } from '@playwright/test';

import { selectBase } from './helpers';

for (const base of [
  { value: 'base', label: 'Base UI' },
  { value: 'radix', label: 'Radix' },
  { value: 'aria', label: 'React Aria' },
]) {
  test(`phone input formats a number and emits E.164 on ${base.label}`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(message.text());
    });
    await page.goto('/components/phone-input', { waitUntil: 'domcontentloaded' });
    const baseSelector = page.getByRole('combobox', { name: 'Select component base' });
    await expect(baseSelector).toBeVisible();
    await selectBase(page, base.label);
    const preview = page.locator(`[data-preview-base="${base.value}"]`).first();
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute('data-preview-hydrated', 'true');
    const countryTrigger = preview.locator(
      base.value === 'aria'
        ? '[data-slot="phone-country-combobox"] [data-slot="combobox-trigger"]'
        : '[aria-label="Country"]'
    );
    await countryTrigger.click();
    const countrySearch = page.getByPlaceholder('Search country');
    await expect(countryTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(countrySearch).toBeVisible();
    await countrySearch.fill('United States');
    await page.getByRole('option', { name: /United States \+1/ }).click();
    await expect(countryTrigger).toContainText('+1');
    await page.keyboard.press('Escape');
    await page.getByRole('textbox', { name: 'Phone number (all countries)' }).fill('74920123');
    await expect(page.getByText('E.164: +50374920123')).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });
}
