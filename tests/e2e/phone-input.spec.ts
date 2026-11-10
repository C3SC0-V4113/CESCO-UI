import { expect, test } from '@playwright/test';

import type { Page } from '@playwright/test';

async function selectCountryForBase(page: Page, baseId: string) {
  if (baseId === 'aria') return;

  const preview = page.getByRole('region', { name: 'Preview' });
  const countryTrigger = preview.getByRole('combobox', { name: 'Country' });
  await countryTrigger.click();
  const countrySearch = page.getByPlaceholder('Search country');
  await expect(countrySearch).toBeVisible();
  await countrySearch.fill('United States');
  await page.getByRole('option', { name: /United States \+1/ }).click();
  await expect(countryTrigger).toContainText('+1');
}

const bases = [
  { id: 'base', label: 'Base UI' },
  { id: 'radix', label: 'Radix' },
  { id: 'aria', label: 'React Aria' },
] as const;

for (const base of bases) {
  test(`phone input formats a number on ${base.label}`, async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on('pageerror', (error) => runtimeErrors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error') runtimeErrors.push(message.text());
    });
    await page.goto(`/components/${base.id}/phone-input`, { waitUntil: 'domcontentloaded' });

    const preview = page.getByRole('region', { name: 'Preview' });
    await expect(preview.locator('[data-preview-hydrated]')).toHaveAttribute(
      'data-preview-hydrated',
      'true'
    );
    await selectCountryForBase(page, base.id);

    const phone = preview.getByRole('textbox', { name: 'Phone number' });
    await phone.fill('2025550123');
    await expect(phone).toHaveValue('(202) 555-0123');
    await expect(preview.getByText('E.164: +12025550123')).toBeVisible();
    expect(runtimeErrors).toEqual([]);
  });
}
