import { lazy } from 'react';

import { readExampleSource } from './code';
import { defineExamples } from './types';

import type { ComponentDocs } from './types';

const DefaultPreview = lazy(() => import('../_examples/password-input/default'));
const DisabledPreview = lazy(() => import('../_examples/password-input/disabled'));
const InvalidPreview = lazy(() => import('../_examples/password-input/invalid'));
const CustomLabelsPreview = lazy(() => import('../_examples/password-input/custom-labels'));

const examples = defineExamples({
  default: {
    title: 'Default',
    description: 'A password field with the default show and hide labels.',
    source: readExampleSource('password-input/default.tsx', 'password-input'),
    preview: <DefaultPreview />,
  },
  disabled: {
    title: 'Disabled',
    description: 'Use the native disabled attribute when the password cannot be changed.',
    source: readExampleSource('password-input/disabled.tsx', 'password-input'),
    preview: <DisabledPreview />,
  },
  invalid: {
    title: 'Invalid',
    description: 'Set aria-invalid and connect an error message with aria-describedby.',
    source: readExampleSource('password-input/invalid.tsx', 'password-input'),
    preview: <InvalidPreview />,
  },
  'custom-labels': {
    title: 'Custom labels',
    description: 'Override both accessible names for the visibility control.',
    source: readExampleSource('password-input/custom-labels.tsx', 'password-input'),
    preview: <CustomLabelsPreview />,
  },
});

export const passwordInputDocs = {
  usage: `import { PasswordInput } from '@/components/password-input';\n\n<PasswordInput id="password" autoComplete="current-password" />`,
  examples,
  api: [
    {
      name: 'showLabel',
      type: 'string',
      defaultValue: '"Show password"',
      description: 'Accessible name of the visibility control while the value is hidden.',
    },
    {
      name: 'hideLabel',
      type: 'string',
      defaultValue: '"Hide password"',
      description: 'Accessible name of the visibility control while the value is visible.',
    },
    {
      name: 'InputGroupInput attributes',
      type: 'InputGroupInput props (except type)',
      defaultValue: '—',
      description:
        'Accepts the underlying input props, including id, name, value, disabled, className, and ARIA attributes.',
    },
  ],
} satisfies ComponentDocs<(typeof examples)[number]['id']>;
