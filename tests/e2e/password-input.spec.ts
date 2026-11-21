import { expect, test } from '@playwright/test';

const bases = [
  { id: 'base', label: 'Base UI' },
  { id: 'radix', label: 'Radix' },
  { id: 'aria', label: 'React Aria' },
] as const;

for (const base of bases) {
  test(`password input toggles visibility on ${base.label}`, async ({ page }, testInfo) => {
    await page.goto(`/components/${base.id}/password-input`, { waitUntil: 'domcontentloaded' });

    const preview = page.getByRole('region', { name: 'Preview' });
    await expect(preview.locator('[data-preview-hydrated]')).toHaveAttribute(
      'data-preview-hydrated',
      'true'
    );
    const password = preview.getByLabel('Password', { exact: true });
    await password.fill('example-password');
    await expect(password).toHaveAttribute('type', 'password');

    await preview.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(preview.getByRole('button', { name: 'Hide password' })).toBeVisible();
    await password.focus();
    await page.screenshot({ path: testInfo.outputPath(`password-input-${base.id}.png`) });

    await preview.getByRole('button', { name: 'Hide password' }).click();
    await expect(password).toHaveAttribute('type', 'password');
  });
}
