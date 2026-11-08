import { expect, test } from '@playwright/test';

test('shows registry navigation and available components', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('navigation', { name: 'Registry components' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Component registry' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Phone Input', exact: true })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Password Input', exact: true })).toBeVisible();
});

test('unknown component routes return the styled 404 page', async ({ page }) => {
  for (const path of ['/components/does-not-exist', '/components/password-input/extra']) {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Component not found' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Registry components' })).toBeVisible();
  }
});
