import { expect, type Page } from '@playwright/test';

export async function selectBase(page: Page, label: string) {
  await expect(page.locator('[data-preview-hydrated="true"]').first()).toBeVisible();
  const trigger = page.getByRole('combobox', { name: 'Select component base' });
  await trigger.click();
  await page.getByRole('option', { name: label, exact: true }).click();
  await expect(trigger).toContainText(label);
}
