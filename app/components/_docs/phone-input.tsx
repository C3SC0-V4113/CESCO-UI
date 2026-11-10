import { lazy } from 'react';

import { readExampleSource } from './code';
import { defineExamples } from './types';

import type { ComponentDocs } from './types';

const DefaultPreview = lazy(() => import('../_examples/phone-input/default'));
const DefaultCountryPreview = lazy(() => import('../_examples/phone-input/default-country'));
const LimitedCountriesPreview = lazy(() => import('../_examples/phone-input/limited-countries'));
const PinnedCountriesPreview = lazy(() => import('../_examples/phone-input/pinned-countries'));
const SpanishLocalePreview = lazy(() => import('../_examples/phone-input/spanish-locale'));
const InvalidPreview = lazy(() => import('../_examples/phone-input/invalid'));
const DisabledPreview = lazy(() => import('../_examples/phone-input/disabled'));

const examples = defineExamples({
  default: {
    title: 'Default',
    description: 'Formats a national number while exposing the E.164 value.',
    ...readExampleSource('phone-input/default.tsx', 'phone-input'),
    preview: <DefaultPreview />,
  },
  'default-country': {
    title: 'Default country',
    description: 'Choose the country shown when the field starts empty.',
    ...readExampleSource('phone-input/default-country.tsx', 'phone-input'),
    preview: <DefaultCountryPreview />,
  },
  'limited-countries': {
    title: 'Limited countries',
    description: 'Restrict the country picker to an explicit set.',
    ...readExampleSource('phone-input/limited-countries.tsx', 'phone-input'),
    preview: <LimitedCountriesPreview />,
  },
  'pinned-countries': {
    title: 'Pinned countries',
    description: 'Keep frequently used countries at the top of the picker.',
    ...readExampleSource('phone-input/pinned-countries.tsx', 'phone-input'),
    preview: <PinnedCountriesPreview />,
  },
  'spanish-locale': {
    title: 'Spanish locale',
    description: 'Localize country names and the picker labels.',
    ...readExampleSource('phone-input/spanish-locale.tsx', 'phone-input'),
    preview: <SpanishLocalePreview />,
  },
  invalid: {
    title: 'Invalid',
    description: 'Use aria-invalid with an associated validation message.',
    ...readExampleSource('phone-input/invalid.tsx', 'phone-input'),
    preview: <InvalidPreview />,
  },
  disabled: {
    title: 'Disabled',
    description: 'Disable the phone field and its country picker together.',
    ...readExampleSource('phone-input/disabled.tsx', 'phone-input'),
    preview: <DisabledPreview />,
  },
});

export const phoneInputDocs = {
  usage: `import { PhoneInput } from '@/components/phone-input';\n\n<PhoneInput defaultCountry="US" onChange={(value) => console.log(value)} />`,
  examples,
  api: [
    {
      name: 'value',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Controlled E.164 phone number.',
    },
    {
      name: 'onChange',
      type: '(value: string) => void',
      defaultValue: 'undefined',
      description: 'Called with the formatted E.164 value.',
    },
    {
      name: 'defaultCountry',
      type: 'CountryCode',
      defaultValue: '"US"',
      description: 'Initial country used to format national digits.',
    },
    {
      name: 'countries',
      type: 'CountryCode[]',
      defaultValue: 'all countries',
      description: 'Countries available in the picker.',
    },
    {
      name: 'pinnedCountries',
      type: 'CountryCode[]',
      defaultValue: '[]',
      description: 'Countries shown in the suggested group.',
    },
    {
      name: 'locale',
      type: 'string',
      defaultValue: '"en"',
      description: 'Locale used for country names and default picker labels.',
    },
    {
      name: 'countryLabel',
      type: 'string',
      defaultValue: '"Country"',
      description: 'Accessible name of the country picker.',
    },
    {
      name: 'searchPlaceholder',
      type: 'string',
      defaultValue: '"Search country"',
      description: 'Placeholder for the country search field.',
    },
    {
      name: 'emptyMessage',
      type: 'string',
      defaultValue: '"No results"',
      description: 'Message shown when country search has no matches.',
    },
    {
      name: 'pinnedGroupLabel',
      type: 'string',
      defaultValue: '"Suggested"',
      description: 'Heading for pinned countries.',
    },
    {
      name: 'allGroupLabel',
      type: 'string',
      defaultValue: '"All countries"',
      description: 'Heading for the complete country list.',
    },
    {
      name: 'placeholder',
      type: 'string',
      defaultValue: '"Phone number"',
      description: 'Placeholder for the phone number input.',
    },
    {
      name: 'ref',
      type: 'Ref<HTMLInputElement>',
      defaultValue: 'undefined',
      description: 'Ref forwarded to the phone number input.',
    },
    {
      name: 'InputHTMLAttributes',
      type: 'InputHTMLAttributes<HTMLInputElement> (except value, onChange, defaultValue)',
      defaultValue: '—',
      description:
        'Accepts standard input props such as id, disabled, className, and ARIA attributes.',
    },
  ],
} satisfies ComponentDocs<(typeof examples)[number]['id']>;
