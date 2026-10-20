import { expect, test } from '@playwright/test';

test('shows registry navigation and the empty registry state', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('navigation', { name: 'Registry components' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Component registry' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'No components yet' })).toBeVisible();
});
