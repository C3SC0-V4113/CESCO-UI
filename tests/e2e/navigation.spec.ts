import { expect, test } from '@playwright/test';

test('shows the registry home heading', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Component registry' })).toBeVisible();
});

test('shows desktop navigation and marks the current component active', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/components/password-input');

  const navigation = page.getByRole('navigation', { name: 'Registry components' });
  await expect(navigation).toBeVisible();
  await expect(navigation.getByRole('link', { name: 'Password Input' })).toHaveAttribute(
    'aria-current',
    'page'
  );
  await expect(navigation.getByRole('link', { name: 'Phone Input' })).not.toHaveAttribute(
    'aria-current',
    'page'
  );
});

test('opens mobile navigation and closes it after navigating', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Registry components' });
  await expect(navigation).toBeHidden();

  await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
  await expect(navigation).toBeVisible();

  await navigation.getByRole('link', { name: 'Phone Input' }).click();
  await expect(page).toHaveURL(/\/components\/phone-input$/);
  await expect(navigation).toBeHidden();
});
