import { lazy, type ComponentType } from 'react';

import { ComponentDocPage } from '@/app/components/_components/component-doc-page';
import {
  ApiReference,
  ComponentPreview,
  ExamplesSection,
  InstallationSection,
  UsageSection,
} from '@/app/components/_components/docs-sections';

import { passwordInputApi } from './api';
import { readExampleSource } from './code';
import { defineExamples } from './types';

import type { PageSectionLink } from '@/app/components/_components/on-this-page';
import type { ComponentBase } from '@/app/components/_components/types';

const previews = {
  default: {
    base: lazy(() => import('../_examples/base/password-input/default')),
    radix: lazy(() => import('../_examples/radix/password-input/default')),
    aria: lazy(() => import('../_examples/aria/password-input/default')),
  },
  disabled: {
    base: lazy(() => import('../_examples/base/password-input/disabled')),
    radix: lazy(() => import('../_examples/radix/password-input/disabled')),
    aria: lazy(() => import('../_examples/aria/password-input/disabled')),
  },
  invalid: {
    base: lazy(() => import('../_examples/base/password-input/invalid')),
    radix: lazy(() => import('../_examples/radix/password-input/invalid')),
    aria: lazy(() => import('../_examples/aria/password-input/invalid')),
  },
  'custom-labels': {
    base: lazy(() => import('../_examples/base/password-input/custom-labels')),
    radix: lazy(() => import('../_examples/radix/password-input/custom-labels')),
    aria: lazy(() => import('../_examples/aria/password-input/custom-labels')),
  },
  'with-field': {
    base: lazy(() => import('../_examples/base/password-input/with-field')),
    radix: lazy(() => import('../_examples/radix/password-input/with-field')),
    aria: lazy(() => import('../_examples/aria/password-input/with-field')),
  },
};

export function PasswordInputDocsPage({ base }: { base: ComponentBase }) {
  const renderPreview = (variants: Record<ComponentBase, ComponentType>) => {
    const Preview = variants[base];
    return <Preview />;
  };
  const examples = defineExamples({
    default: {
      title: 'Default',
      description: 'Add an associated label and use the password visibility control.',
      source: readExampleSource(base, 'password-input', 'default.tsx'),
      preview: renderPreview(previews.default),
    },
    disabled: {
      title: 'Disabled',
      description: 'Use the native disabled attribute when the password cannot be changed.',
      source: readExampleSource(base, 'password-input', 'disabled.tsx'),
      preview: renderPreview(previews.disabled),
    },
    invalid: {
      title: 'Invalid',
      description: 'Set aria-invalid and connect an error message with aria-describedby.',
      source: readExampleSource(base, 'password-input', 'invalid.tsx'),
      preview: renderPreview(previews.invalid),
    },
    'custom-labels': {
      title: 'Custom labels',
      description: 'Override both accessible names for the visibility control.',
      source: readExampleSource(base, 'password-input', 'custom-labels.tsx'),
      preview: renderPreview(previews['custom-labels']),
    },
    'with-field': {
      title: 'With Field',
      description:
        'Compose the input with shadcn Field primitives. Add Field first with `npx shadcn@latest add field`.',
      source: readExampleSource(base, 'password-input', 'with-field.tsx'),
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
      name="password-input"
      title="Password Input"
      description="A password input with an accessible control to show or hide its value."
      base={base}
      sections={sections}
    >
      <ComponentPreview example={examples[0]} />
      <InstallationSection name="password-input" />
      <UsageSection
        usage={`import { PasswordInput } from '@/components/password-input';\n\n<PasswordInput id="password" autoComplete="current-password" />`}
      />
      <ExamplesSection examples={examples.slice(1)} />
      <ApiReference props={passwordInputApi} />
    </ComponentDocPage>
  );
}
