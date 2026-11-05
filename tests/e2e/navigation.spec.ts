import { expect, test } from '@playwright/test';

test('shows registry navigation and available components', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('navigation', { name: 'Registry components' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Component registry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Phone Input', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Password Input', exact: true })).toBeVisible();
});
