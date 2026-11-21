import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

const bases = [
  { id: 'base', label: 'Base UI' },
  { id: 'radix', label: 'Radix' },
  { id: 'aria', label: 'React Aria' },
] as const;

async function openPreview(page: Page, baseId: string) {
  await page.goto(`/components/${baseId}/phone-input`, { waitUntil: 'domcontentloaded' });
  const preview = page.getByRole('region', { name: 'Preview' });
  await expect(preview.locator('[data-preview-hydrated]')).toHaveAttribute(
    'data-preview-hydrated',
    'true'
  );
  return preview;
}

for (const base of bases) {
  test(`phone input formats a number on ${base.label}`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(message.text());
    });
    const preview = await openPreview(page, base.id);

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
    const selectedCountry = page.getByRole('option', { name: /^United States \+1/ });
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
    await countrySearch.fill('El Salvador');
    await page.getByRole('option', { name: /El Salvador \+503/ }).click();
    await expect(countryTrigger).toContainText('+503');
    await countryTrigger.click();
    await countrySearch.fill('United States');
    await page.getByRole('option', { name: /^United States \+1/ }).click();
    await expect(countryTrigger).toContainText('+1');

    const phone = preview.getByRole('textbox', { name: 'Phone number' });
    await phone.fill('2025550123');
    await expect(phone).toHaveValue('(202) 555-0123');
    await expect(preview.getByText('E.164: +12025550123')).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });

  test(`phone input restores formatting after deleting an overflow digit on ${base.label}`, async ({
    page,
  }) => {
    const preview = await openPreview(page, base.id);
    const input = preview.getByRole('textbox', { name: 'Phone number' });
    await input.pressSequentially('50255512345');
    await expect(input).toHaveValue('50255512345');
    await input.press('Backspace');
    await expect(input).toHaveValue('(502) 555-1234');
    await expect(preview.getByText('E.164: +15025551234')).toBeVisible();

    await input.fill('50255512345');
    await input.press('Home');
    for (let index = 0; index < 6; index++) await input.press('ArrowRight');
    await input.press('Backspace');
    await expect(input).toHaveValue('(502) 551-2345');
    expect(await input.evaluate((element: HTMLInputElement) => element.selectionStart)).toBe(8);
    await expect(preview.getByText('E.164: +15025512345')).toBeVisible();
  });
}
