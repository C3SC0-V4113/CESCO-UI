import { lazy, type ComponentType } from 'react';

import { ComponentDocPage } from '@/app/components/_components/component-doc-page';
import {
  ApiReference,
  ComponentPreview,
  ExamplesSection,
  InstallationSection,
  UsageSection,
} from '@/app/components/_components/docs-sections';

import { phoneInputApi } from './api';
import { readExampleSource } from './code';
import { defineExamples } from './types';

import type { PageSectionLink } from '@/app/components/_components/on-this-page';
import type { ComponentBase } from '@/app/components/_components/types';

const previews = {
  default: {
    base: lazy(() => import('../_examples/base/phone-input/default')),
    radix: lazy(() => import('../_examples/radix/phone-input/default')),
    aria: lazy(() => import('../_examples/aria/phone-input/default')),
  },
  'default-country': {
    base: lazy(() => import('../_examples/base/phone-input/default-country')),
    radix: lazy(() => import('../_examples/radix/phone-input/default-country')),
    aria: lazy(() => import('../_examples/aria/phone-input/default-country')),
  },
  disabled: {
    base: lazy(() => import('../_examples/base/phone-input/disabled')),
    radix: lazy(() => import('../_examples/radix/phone-input/disabled')),
    aria: lazy(() => import('../_examples/aria/phone-input/disabled')),
  },
  invalid: {
    base: lazy(() => import('../_examples/base/phone-input/invalid')),
    radix: lazy(() => import('../_examples/radix/phone-input/invalid')),
    aria: lazy(() => import('../_examples/aria/phone-input/invalid')),
  },
  'pinned-countries': {
    base: lazy(() => import('../_examples/base/phone-input/pinned-countries')),
    radix: lazy(() => import('../_examples/radix/phone-input/pinned-countries')),
    aria: lazy(() => import('../_examples/aria/phone-input/pinned-countries')),
  },
  'spanish-locale': {
    base: lazy(() => import('../_examples/base/phone-input/spanish-locale')),
    radix: lazy(() => import('../_examples/radix/phone-input/spanish-locale')),
    aria: lazy(() => import('../_examples/aria/phone-input/spanish-locale')),
  },
  'restricted-countries': {
    base: lazy(() => import('../_examples/base/phone-input/restricted-countries')),
    radix: lazy(() => import('../_examples/radix/phone-input/restricted-countries')),
    aria: lazy(() => import('../_examples/aria/phone-input/restricted-countries')),
  },
  'with-field': {
    base: lazy(() => import('../_examples/base/phone-input/with-field')),
    radix: lazy(() => import('../_examples/radix/phone-input/with-field')),
    aria: lazy(() => import('../_examples/aria/phone-input/with-field')),
  },
};

export function PhoneInputDocsPage({ base }: { base: ComponentBase }) {
  const renderPreview = (variants: Record<ComponentBase, ComponentType>) => {
    const Preview = variants[base];
    return <Preview />;
  };
  const examples = defineExamples({
    default: {
      title: 'Default',
      description: 'Format a national number while exposing its E.164 value.',
      source: readExampleSource(base, 'phone-input', 'default.tsx'),
      preview: renderPreview(previews.default),
    },
    'default-country': {
      title: 'Default country',
      description: 'Set the country whose dialing code and national format are used initially.',
      source: readExampleSource(base, 'phone-input', 'default-country.tsx'),
      preview: renderPreview(previews['default-country']),
    },
    disabled: {
      title: 'Disabled',
      description: 'Disable the phone field when it cannot be changed.',
      source: readExampleSource(base, 'phone-input', 'disabled.tsx'),
      preview: renderPreview(previews.disabled),
    },
    invalid: {
      title: 'Invalid',
      description: 'Expose an invalid state and connect the validation message.',
      source: readExampleSource(base, 'phone-input', 'invalid.tsx'),
      preview: renderPreview(previews.invalid),
    },
    'restricted-countries': {
      title: 'Restricted countries',
      description: 'Limit the picker to the countries supported by a form or workflow.',
      source: readExampleSource(base, 'phone-input', 'restricted-countries.tsx'),
      preview: renderPreview(previews['restricted-countries']),
    },
    'pinned-countries': {
      title: 'Pinned countries',
      description: 'Keep frequently used countries in the suggested group.',
      source: readExampleSource(base, 'phone-input', 'pinned-countries.tsx'),
      preview: renderPreview(previews['pinned-countries']),
    },
    'spanish-locale': {
      title: 'Spanish locale',
      description: 'Localize the country names, search prompt, and picker group labels.',
      source: readExampleSource(base, 'phone-input', 'spanish-locale.tsx'),
      preview: renderPreview(previews['spanish-locale']),
    },
    'with-field': {
      title: 'With Field',
      description:
        'Compose the input with shadcn Field primitives. Add Field first with `npx shadcn@latest add field`.',
      source: readExampleSource(base, 'phone-input', 'with-field.tsx'),
      preview: renderPreview(previews['with-field']),
    },
  });
  const sections: PageSectionLink[] = [
    { id: 'preview', title: 'Preview' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'examples', title: 'Examples' },
    ...examples.slice(1).map(({ id, title }) => ({ id: `example-${id}`, title })),
    { id: 'api-reference', title: 'API Reference' },
  ];

  return (
    <ComponentDocPage
      name="phone-input"
      title="Phone Input"
      description="A country-aware phone input that formats numbers as you type and emits E.164 values."
      base={base}
      sections={sections}
    >
      <ComponentPreview example={examples[0]} />
      <InstallationSection name="phone-input" />
      <UsageSection
        usage={`import { PhoneInput } from '@/components/phone-input';\n\n<PhoneInput defaultCountry="US" onChange={(value) => console.log(value)} />`}
      />
      <ExamplesSection examples={examples.slice(1)} />
      <ApiReference props={phoneInputApi} />
    </ComponentDocPage>
  );
}
