import { expect, test, type Page } from '@playwright/test';

import { selectBase } from './helpers';

const BASES = [
  { label: 'Radix', value: 'radix', name: 'radix' },
  { label: 'React Aria', value: 'aria', name: 'react-aria' },
  { label: 'Base UI', value: 'base', name: 'base-ui' },
] as const;

async function openPreview(page: Page, base: (typeof BASES)[number]) {
  await page.goto('/components/password-input', { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Select component base')).toBeVisible();
  await selectBase(page, base.label);
  const preview = page.locator(`[data-preview-base="${base.value}"]`).first();
  await expect(preview).toBeVisible();
  await expect(preview).toHaveAttribute('data-preview-hydrated', 'true');
  return preview;
}

for (const base of BASES) {
  test.describe(`Password Input with ${base.label}`, () => {
    test('shows and hides the password with the eye button', async ({ page }, testInfo) => {
      const preview = await openPreview(page, base);

      const password = preview.getByLabel('Password', { exact: true });
      await password.fill('example-password');

      await preview.getByRole('button', { name: 'Show password' }).click();
      await expect(password).toHaveAttribute('type', 'text');
      await expect(preview.getByRole('button', { name: 'Hide password' })).toBeVisible();

      await expect(password).toHaveValue('example-password');
      await password.focus();
      await page.screenshot({
        path: testInfo.outputPath(`password-input-${base.name}.png`),
      });

      await preview.getByRole('button', { name: 'Hide password' }).click();
      await expect(password).toHaveAttribute('type', 'password');
    });

    test('toggles by keyboard', async ({ page }) => {
      const preview = await openPreview(page, base);

      const password = preview.getByLabel('Password', { exact: true });
      await password.focus();
      await page.keyboard.press('Tab');

      const toggle = preview.getByRole('button', { name: 'Show password' });
      await expect(toggle).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(password).toHaveAttribute('type', 'text');
      await expect(preview.getByRole('button', { name: 'Hide password' })).toBeVisible();

      await page.keyboard.press('Space');
      await expect(password).toHaveAttribute('type', 'password');
      await expect(preview.getByRole('button', { name: 'Show password' })).toBeVisible();
    });
  });
}
