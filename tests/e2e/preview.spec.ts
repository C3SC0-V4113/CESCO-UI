import { expect, test } from '@playwright/test';

test.describe('registry preview', () => {
  test('renders the stat cards', async ({ page }) => {
    await page.goto('/preview');

    await expect(page.getByText('+8.5%')).toBeVisible();
    await expect(page.getByText('-1.2%')).toBeVisible();
  });

  test('toggles the favorite button', async ({ page }) => {
    await page.goto('/preview');

    const favorite = page.getByRole('button', { name: 'Add to favorites' });
    await expect(favorite).toHaveAttribute('aria-pressed', 'false');

    await favorite.click();
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');

    await favorite.press('Space');
    await expect(favorite).toHaveAttribute('aria-pressed', 'false');
  });
});
