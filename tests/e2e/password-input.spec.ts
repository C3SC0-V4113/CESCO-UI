import { expect, test } from '@playwright/test';

import { selectBase } from './helpers';

const bases = [
  { label: 'Radix', value: 'radix' },
  { label: 'React Aria', value: 'aria' },
  { label: 'Base UI', value: 'base' },
] as const;

test('shows and hides the password with the eye button for every base', async ({
  page,
}, testInfo) => {
  await page.goto('/components/password-input', { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Select component base')).toBeVisible();

  for (const base of bases) {
    await selectBase(page, base.label);
    const preview = page.locator(`[data-preview-base="${base.value}"]`).first();
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute('data-preview-hydrated', 'true');

    const password = preview.getByLabel('Password', { exact: true });
    await password.fill('example-password');

    await preview.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(preview.getByRole('button', { name: 'Hide password' })).toBeVisible();

    await expect(password).toHaveValue('example-password');
    await password.focus();
    const screenshotName = base.label.toLowerCase().replace(' ', '-');
    await page.screenshot({ path: testInfo.outputPath(`password-input-${screenshotName}.png`) });

    await preview.getByRole('button', { name: 'Hide password' }).click();
    await expect(password).toHaveAttribute('type', 'password');
  }
});

test('toggles by keyboard for every base', async ({ page }) => {
  await page.goto('/components/password-input', { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Select component base')).toBeVisible();

  for (const base of bases) {
    await selectBase(page, base.label);
    const preview = page.locator(`[data-preview-base="${base.value}"]`).first();
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute('data-preview-hydrated', 'true');

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
  }
});
