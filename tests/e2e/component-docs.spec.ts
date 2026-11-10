import { expect, test } from '@playwright/test';

const bases = [
  { id: 'base', label: 'Base UI' },
  { id: 'radix', label: 'Radix' },
  { id: 'aria', label: 'React Aria' },
] as const;

const pages = [
  {
    name: 'password-input',
    title: 'Password Input',
    input: '#password-default',
    example: '#example-default',
    codeMarker: '@/components/password-input',
    apiRow: 'InputGroupInput attributes',
    examples: ['Default', 'Disabled', 'Invalid', 'Custom labels', 'With Field'],
  },
  {
    name: 'phone-input',
    title: 'Phone Input',
    input: '#phone-default',
    example: '#example-restricted-countries',
    codeMarker: '@/components/phone-input',
    apiRow: 'defaultCountry',
    examples: [
      'Default',
      'Default country',
      'Disabled',
      'Invalid',
      'Restricted countries',
      'Pinned countries',
      'Spanish locale',
      'With Field',
    ],
  },
] as const;

for (const component of pages) {
  for (const base of bases) {
    test(`${component.title} docs render for ${base.label}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`/components/${base.id}/${component.name}`, {
        waitUntil: 'domcontentloaded',
      });

      await expect(page.getByRole('heading', { name: component.title, level: 1 })).toBeVisible();
      await expect(page).toHaveURL(`/components/${base.id}/${component.name}`);
      await expect(
        page.getByRole('navigation', { name: 'Component base' }).getByRole('link', {
          name: base.label,
        })
      ).toHaveAttribute('aria-current', 'page');
      await expect(page.locator(component.input).first()).toBeVisible();

      const toc = page.getByRole('navigation', { name: 'On this page' });
      for (const link of await toc.getByRole('link').all()) {
        const target = await link.getAttribute('href');
        expect(target).toMatch(/^#/);
        await expect(page.locator(target!)).toHaveCount(1);
      }

      await toc.getByRole('link', { name: 'Installation' }).click();
      await expect(page).toHaveURL(/#installation$/);

      for (const title of component.examples) {
        await expect(
          page.getByRole('heading', { name: title, exact: true, level: 3 })
        ).toBeVisible();
      }
      const example = page.locator(component.example);
      await expect(example.getByRole('heading', { level: 3 })).toBeVisible();
      const viewCode = example.getByRole('button', { name: 'View Code' });
      await viewCode.click();
      const code = example.locator('[data-slot="code-block-content"]');
      await expect(code).toBeVisible();
      await expect(code).toContainText(component.codeMarker);

      await page.getByRole('row', { name: new RegExp(component.apiRow) }).waitFor();
    });
  }
}

test('legacy component URLs permanently redirect to the Base UI route', async ({ request }) => {
  const response = await request.get('/components/password-input', { maxRedirects: 0 });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toContain('/components/base/password-input');
});
