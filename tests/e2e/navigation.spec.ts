import { expect, test } from '@playwright/test';

test('shows the registry home heading', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });

  await expect(page.getByRole('heading', { name: 'Component registry' })).toBeVisible();
});

test('shows desktop navigation and marks the current component active', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/components/radix/password-input');

  const navigation = page.getByRole('navigation', { name: 'Registry components' });
  await expect(navigation).toBeVisible();
  const password = navigation.getByRole('link', { name: 'Password Input' });
  const phone = navigation.getByRole('link', { name: 'Phone Input' });
  await expect(password).toHaveAttribute('href', '/components/radix/password-input');
  await expect(password).toHaveAttribute('aria-current', 'page');
  await expect(phone).toHaveAttribute('href', '/components/radix/phone-input');
  await expect(phone).not.toHaveAttribute('aria-current', 'page');
});

test('opens mobile navigation and closes it after navigating', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');

  const navigation = page.getByRole('navigation', { name: 'Registry components' });
  await expect(navigation).toBeHidden();

  await page.getByRole('button', { name: 'Toggle Sidebar' }).click();
  await expect(navigation).toBeVisible();

  await navigation.getByRole('link', { name: 'Phone Input' }).click();
  await expect(page).toHaveURL(/\/components\/base\/phone-input$/);
  await expect(navigation).toBeHidden();
});

test('unknown base and component routes return the styled 404 page', async ({ page }) => {
  const baseRouteResponse = await page.goto('/components/base', { waitUntil: 'domcontentloaded' });
  expect(baseRouteResponse?.status()).toBe(404);
  await expect(page).toHaveURL('/components/base');

  for (const path of [
    '/components/nope/password-input',
    '/components/base/does-not-exist',
    '/components/password-input/extra',
  ]) {
    const response = await page.goto(path, { waitUntil: 'domcontentloaded' });

    expect(response?.status()).toBe(404);
    await expect(page.getByRole('heading', { name: 'Component not found' })).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Registry components' })).toBeVisible();
  }
});
