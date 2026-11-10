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
    base: lazy(() => import('../_examples/generated/base/phone-input/default')),
    radix: lazy(() => import('../_examples/generated/radix/phone-input/default')),
    aria: lazy(() => import('../_examples/generated/aria/phone-input/default')),
  },
  'restricted-countries': {
    base: lazy(() => import('../_examples/generated/base/phone-input/restricted-countries')),
    radix: lazy(() => import('../_examples/generated/radix/phone-input/restricted-countries')),
    aria: lazy(() => import('../_examples/generated/aria/phone-input/restricted-countries')),
  },
  'with-field': {
    base: lazy(() => import('../_examples/generated/base/phone-input/with-field')),
    radix: lazy(() => import('../_examples/generated/radix/phone-input/with-field')),
    aria: lazy(() => import('../_examples/generated/aria/phone-input/with-field')),
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
      source: readExampleSource('phone-input/default.tsx'),
      preview: renderPreview(previews.default),
    },
    'restricted-countries': {
      title: 'Restricted countries',
      description: 'Limit the picker to the countries supported by a form or workflow.',
      source: readExampleSource('phone-input/restricted-countries.tsx'),
      preview: renderPreview(previews['restricted-countries']),
    },
    'with-field': {
      title: 'With Field',
      description:
        'Compose the input with shadcn Field primitives. Add Field first with `npx shadcn@latest add field`.',
      source: readExampleSource('phone-input/with-field.tsx'),
      preview: renderPreview(previews['with-field']),
    },
  });
  const sections: PageSectionLink[] = [
    { id: 'preview', title: 'Preview' },
    { id: 'installation', title: 'Installation' },
    { id: 'usage', title: 'Usage' },
    { id: 'examples', title: 'Examples' },
    ...examples.map(({ id, title }) => ({ id: `example-${id}`, title })),
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
      <ExamplesSection examples={examples} />
      <ApiReference props={phoneInputApi} />
    </ComponentDocPage>
  );
}
