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
    example: '#example-disabled',
    codeMarker: '@/components/password-input',
    apiRow: 'InputGroupInput attributes',
    examples: ['Disabled', 'Invalid', 'Custom labels', 'With Field'],
  },
  {
    name: 'phone-input',
    title: 'Phone Input',
    input: '#phone-default',
    example: '#example-restricted-countries',
    codeMarker: '@/components/phone-input',
    apiRow: 'PhoneInputRoot children',
    examples: [
      'Default country',
      'Disabled',
      'Invalid',
      'Restricted countries',
      'Pinned countries',
      'Spanish locale',
      'With Field',
      'Without country picker',
      'Composition',
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
      const ids = await page
        .locator('[id]')
        .evaluateAll((elements) => elements.map((element) => element.id));
      expect(ids.filter((id, index) => ids.indexOf(id) !== index)).toEqual([]);

      await toc.getByRole('link', { name: 'Installation' }).click();
      await expect(page).toHaveURL(/#installation$/);
      await expect(toc.getByRole('link', { name: 'Installation' })).toHaveAttribute(
        'aria-current',
        'location'
      );

      const packageCommands = [
        ['npm', `npx shadcn@latest add @cesco/${component.name}`],
        ['pnpm', `pnpm dlx shadcn@latest add @cesco/${component.name}`],
        ['yarn', `yarn dlx shadcn@latest add @cesco/${component.name}`],
        ['bun', `bunx --bun shadcn@latest add @cesco/${component.name}`],
      ] as const;
      for (const [manager, command] of packageCommands) {
        await page.getByRole('tab', { name: manager, exact: true }).click();
        await expect(
          page.locator(
            `#installation [data-slot="code-block-content"][aria-label="${manager} install command"]`
          )
        ).toContainText(command);
      }

      for (const title of component.examples) {
        await expect(
          page.getByRole('heading', { name: title, exact: true, level: 3 })
        ).toBeVisible();
      }
      const example = page.locator(component.example);
      await expect(example.getByRole('heading', { level: 3 })).toBeVisible();
      const card = example.locator('[data-slot="example-showcase"]');
      const viewCode = example.getByRole('button', { name: 'View code' });
      const codePanel = example.locator('[data-slot="collapsible-content"]');
      const code = example.locator('[data-slot="code-block-content"]');
      const copyButton = example.locator('[data-slot="code-block-copy-button"]');
      await expect(viewCode).toHaveAttribute('aria-expanded', 'false');
      await expect(codePanel).toHaveAttribute('inert', '');
      await code.focus();
      await expect(code).not.toBeFocused();
      await copyButton.focus();
      await expect(copyButton).not.toBeFocused();
      await viewCode.focus();
      await expect(viewCode).toBeFocused();
      const triggerBox = await viewCode.boundingBox();
      const cardBox = await card.boundingBox();
      expect(triggerBox).not.toBeNull();
      expect(cardBox).not.toBeNull();
      expect(triggerBox!.x - 3).toBeGreaterThanOrEqual(cardBox!.x);
      expect(triggerBox!.y - 3).toBeGreaterThanOrEqual(cardBox!.y);
      expect(triggerBox!.x + triggerBox!.width + 3).toBeLessThanOrEqual(
        cardBox!.x + cardBox!.width
      );
      expect(triggerBox!.y + triggerBox!.height + 3).toBeLessThanOrEqual(
        cardBox!.y + cardBox!.height
      );
      await page.keyboard.press('Enter');
      const hideCode = example.getByRole('button', { name: 'Hide code' });
      await expect(hideCode).toHaveAttribute('aria-expanded', 'true');
      await expect(codePanel).not.toHaveAttribute('inert', '');
      await expect(code).toBeVisible();
      await expect(code).toContainText(component.codeMarker);
      await page.keyboard.press('Space');
      await expect(example.getByRole('button', { name: 'View code' })).toHaveAttribute(
        'aria-expanded',
        'false'
      );

      await page.getByRole('row', { name: new RegExp(component.apiRow) }).waitFor();
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
      const tocBox = await toc.boundingBox();
      expect(tocBox).not.toBeNull();
      expect(tocBox!.y).toBeGreaterThanOrEqual(31);
      expect(tocBox!.y + tocBox!.height).toBeLessThanOrEqual(900);
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await expect(toc.getByRole('link', { name: 'API reference' })).toHaveAttribute(
        'aria-current',
        'location'
      );
    });
  }
}

for (const base of bases) {
  test(`phone input composed examples work on ${base.label}`, async ({ page }) => {
    await page.goto(`/components/${base.id}/phone-input`, { waitUntil: 'domcontentloaded' });

    const fixedCountry = page.locator('#example-without-country-picker');
    await expect(fixedCountry.locator('[data-preview-hydrated]')).toHaveAttribute(
      'data-preview-hydrated',
      'true'
    );
    const fixedInput = fixedCountry.getByRole('textbox', { name: 'Phone number' });
    await fixedInput.fill('74920123');
    await expect(fixedInput).toHaveValue('7492 0123');
    await expect(fixedCountry.getByText('E.164: +50374920123')).toBeVisible();
    await expect(fixedCountry.locator('[data-slot="phone-country-trigger"]')).toHaveCount(0);
    await fixedInput.fill('+1 415 555 2671');
    await expect(fixedInput).toHaveValue('+1 415 555 2671');
    await expect(fixedCountry.getByText('E.164: +14155552671')).toBeVisible();

    const composition = page.locator('#example-composition');
    await expect(composition.locator('[data-preview-hydrated]')).toHaveAttribute(
      'data-preview-hydrated',
      'true'
    );
    const composedInput = composition.getByRole('textbox', { name: 'Phone number' });
    const countryTrigger = composition.locator('[data-slot="phone-country-trigger"]');
    await expect(composedInput).toBeVisible();
    await expect(countryTrigger).toContainText('+503');
    await composedInput.fill('+1 415 555 2671');
    await expect(composedInput).toHaveValue('(415) 555-2671');
    await expect(countryTrigger).toContainText('+1');
    await expect(composition.getByText('E.164: +14155552671')).toBeVisible();
  });
}

test('legacy component URLs permanently redirect to the Base UI route', async ({ request }) => {
  for (const name of ['password-input', 'phone-input']) {
    const response = await request.get(`/components/${name}`, { maxRedirects: 0 });
    expect(response.status()).toBe(308);
    expect(response.headers().location).toBe(`/components/base/${name}`);
  }
});
