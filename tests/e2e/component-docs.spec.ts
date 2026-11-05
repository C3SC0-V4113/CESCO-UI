import { expect, test, type Page } from '@playwright/test';

import { selectBase } from './helpers';

type ComponentDocsCheck = {
  component: 'password-input' | 'phone-input';
  inputSelector: string;
  inputText: string;
  expectedInputValue: string;
  exampleName: string;
  exampleInputSelector: string;
  exampleInputText: string;
  expectedExampleInputValue: string;
  exampleCodeMarker: string;
  copiedSource: string;
  waitUntilInteractive: (page: Page) => Promise<void>;
};

async function verifyComponentDocs(page: Page, check: ComponentDocsCheck) {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: async (value: string) => {
          (window as Window & { copiedText?: string }).copiedText = value;
        },
      },
    });
  });
  await page.goto(`/components/${check.component}`, { waitUntil: 'domcontentloaded' });
  await expect(page.getByLabel('Select component base')).toBeVisible();
  await expect(page.locator('[data-preview-hydrated="true"]').first()).toBeVisible();

  const defaultInput = page.locator(check.inputSelector);
  await expect(defaultInput).toBeVisible();
  await check.waitUntilInteractive(page);
  await defaultInput.fill(check.inputText);
  await expect(defaultInput).toHaveValue(check.expectedInputValue);
  await selectBase(page, 'Radix');
  await expect(
    page.locator('[data-preview-base="radix"][data-preview-hydrated="true"]').first()
  ).toBeVisible();
  await expect(defaultInput).toBeVisible();
  await expect(defaultInput).toHaveValue(check.expectedInputValue);

  const exampleTabs = page.getByRole('tablist', { name: 'Examples' });
  const previewTabs = page.getByRole('tablist', { name: 'Example view' }).first();
  await expect(previewTabs.getByRole('tab', { name: 'Preview' })).toHaveAttribute(
    'aria-selected',
    'true'
  );
  await exampleTabs.getByRole('tab', { name: check.exampleName, exact: true }).click();
  const exampleInput = page.locator(check.exampleInputSelector);
  await expect(exampleInput).toBeVisible();
  await exampleInput.fill(check.exampleInputText);
  await expect(exampleInput).toHaveValue(check.expectedExampleInputValue);

  const duplicateIds = await page.locator('[id]').evaluateAll((elements) => {
    const ids = elements.map((element) => element.id).filter(Boolean);
    return ids.filter((id, index) => ids.indexOf(id) !== index);
  });
  expect(duplicateIds).toEqual([]);

  const selectedExamplePanel = page.getByRole('tabpanel', { name: check.exampleName });
  const selectedViewTabs = selectedExamplePanel.getByRole('tablist', { name: 'Example view' });
  await expect(selectedExamplePanel.locator(check.exampleInputSelector)).toBeVisible();
  await selectedViewTabs.getByRole('tab', { name: 'Code' }).click();
  const code = selectedExamplePanel.getByRole('tabpanel', { name: 'Code' }).locator('pre code');
  await expect(code).toContainText(`@/components/${check.component}`);
  await expect(code).not.toContainText('@/registry');
  await expect(code).toContainText(check.exampleCodeMarker);
  await page.getByRole('button', { name: 'Copy' }).last().click();
  await expect(page.getByRole('status').last()).toHaveText('Copied');
  await expect
    .poll(() => page.evaluate(() => (window as Window & { copiedText?: string }).copiedText))
    .toContain(check.copiedSource);
}

test('password input docs preserve the controlled preview and provide installed code', async ({
  page,
}) => {
  await verifyComponentDocs(page, {
    component: 'password-input',
    inputSelector: '#password-default',
    inputText: 'demo-password',
    expectedInputValue: 'demo-password',
    exampleName: 'Invalid',
    exampleInputSelector: '#password-invalid',
    exampleInputText: 'invalid-demo',
    expectedExampleInputValue: 'invalid-demo',
    exampleCodeMarker: 'id="password-invalid"',
    copiedSource: '@/components/password-input',
    waitUntilInteractive: async (currentPage) => {
      await currentPage.getByRole('button', { name: 'Show password' }).first().click();
      await expect(currentPage.locator('#password-default')).toHaveAttribute('type', 'text');
      await currentPage.getByRole('button', { name: 'Hide password' }).first().click();
    },
  });
  await expect(page).toHaveURL(/\/components\/password-input$/);
});

test('phone input docs preserve the controlled preview and provide installed code', async ({
  page,
}) => {
  await verifyComponentDocs(page, {
    component: 'phone-input',
    inputSelector: '#phone-input-all-countries',
    inputText: '74920123',
    expectedInputValue: '7492 0123',
    exampleName: 'Limited countries',
    exampleInputSelector: '#phone-limited',
    exampleInputText: '2025550123',
    expectedExampleInputValue: '(202) 555-0123',
    exampleCodeMarker: 'id="phone-limited"',
    copiedSource: '@/components/phone-input',
    waitUntilInteractive: async (currentPage) => {
      await currentPage.getByRole('combobox', { name: 'Country' }).first().click();
      await expect(currentPage.getByPlaceholder('Search country').first()).toBeVisible();
      await currentPage.keyboard.press('Escape');
    },
  });
  await expect(page).toHaveURL(/\/components\/phone-input$/);
});
