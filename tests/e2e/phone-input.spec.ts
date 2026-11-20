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
    const countryTrigger = preview.locator('[data-slot="phone-country-trigger"]');
    await countryTrigger.click();
    const countrySearch = page.getByPlaceholder('Search country');
    await expect(countryTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(countrySearch).toBeVisible();
    const pickerContent = page.locator(
      '[data-slot="select-content"]:visible, [data-slot="combobox-content"]:visible'
    );
    await expect(pickerContent).toHaveCount(1);
    await expect
      .poll(async () => (await pickerContent.boundingBox())?.width ?? 0)
      .toBeGreaterThanOrEqual(280);
    await expect
      .poll(async () => (await pickerContent.boundingBox())?.height ?? 0)
      .toBeLessThanOrEqual(300);
    const selectedCountry = page.getByRole('option', { name: /El Salvador \+503/ });
    await expect(selectedCountry).toBeVisible();
    await expect(selectedCountry).toHaveAttribute('aria-selected', 'true');
    await expect
      .poll(async () => {
        const option = await selectedCountry.boundingBox();
        const list = await page.getByRole('listbox').first().boundingBox();
        return Boolean(
          option && list && option.y >= list.y && option.y + option.height <= list.y + list.height
        );
      })
      .toBe(true);
    await countrySearch.fill('bosnia');
    const bosniaOption = page.getByRole('option', { name: /Bosnia & Herzegovina \+387/ });
    await expect(bosniaOption).toBeVisible();
    const countryName = bosniaOption.getByText('Bosnia & Herzegovina', { exact: true });
    const callingCode = bosniaOption.getByText('+387', { exact: true });
    await expect(countryName).toHaveCSS('white-space', 'nowrap');
    await expect
      .poll(async () => {
        const name = await countryName.boundingBox();
        const code = await callingCode.boundingBox();
        return Boolean(name && code && name.x + name.width <= code.x);
      })
      .toBe(true);
    await countrySearch.fill('United States');
    await page.getByRole('option', { name: /United States \+1/ }).click();
    await expect(countryTrigger).toContainText('+1');
    await page.keyboard.press('Escape');
    await preview.getByRole('textbox', { name: 'Phone number (all countries)' }).fill('74920123');
    await expect(page.getByText('E.164: +174920123')).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });

  test(`phone input restores formatting after deleting an overflow digit on ${base.label}`, async ({
    page,
  }) => {
    await page.goto('/components/phone-input', { waitUntil: 'domcontentloaded' });
    await selectBase(page, base.label);
    const preview = page.locator(`[data-preview-base="${base.value}"]`).first();
    await expect(preview).toHaveAttribute('data-preview-hydrated', 'true');
    const input = preview.getByRole('textbox', { name: 'Phone number (all countries)' });
    await input.pressSequentially('749201234');
    await expect(input).toHaveValue('749201234');
    await input.press('Backspace');
    await expect(input).toHaveValue('7492 0123');
    await expect(page.getByText('E.164: +50374920123')).toBeVisible();
  });
}
