import { expect, test } from '@playwright/test';

test('shows and hides the password with the eye button for every base', async ({
  page,
}, testInfo) => {
  await page.goto('/components/password-input');

  for (const base of ['Radix', 'React Aria', 'Base UI']) {
    await page.getByLabel('Select component base').selectOption({ label: base });

    const password = page.getByLabel('Password', { exact: true });
    await password.fill('example-password');

    await page.getByRole('button', { name: 'Show password' }).click();
    await expect(password).toHaveAttribute('type', 'text');
    await expect(page.getByRole('button', { name: 'Hide password' })).toBeVisible();

    await expect(password).toHaveValue('example-password');
    await password.focus();
    const screenshotName = base.toLowerCase().replace(' ', '-');
    await page.screenshot({ path: testInfo.outputPath(`password-input-${screenshotName}.png`) });

    await page.getByRole('button', { name: 'Hide password' }).click();
    await expect(password).toHaveAttribute('type', 'password');
  }
});

test('toggles by keyboard for every base', async ({ page }) => {
  await page.goto('/components/password-input');

  for (const base of ['Radix', 'React Aria', 'Base UI']) {
    await page.getByLabel('Select component base').selectOption({ label: base });

    const password = page.getByLabel('Password', { exact: true });
    await password.focus();
    await page.keyboard.press('Tab');

    const toggle = page.getByRole('button', { name: 'Show password' });
    await expect(toggle).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(password).toHaveAttribute('type', 'text');
    await expect(page.getByRole('button', { name: 'Hide password' })).toBeVisible();

    await page.keyboard.press('Space');
    await expect(password).toHaveAttribute('type', 'password');
    await expect(page.getByRole('button', { name: 'Show password' })).toBeVisible();
  }
});
