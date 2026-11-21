import type { ApiProp } from './types';

export const passwordInputApi: ApiProp[] = [
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
];

export const phoneInputApi: ApiProp[] = [
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
];

export const phoneInputPartsApi: ApiProp[] = [
  {
    name: 'PhoneInputRoot',
    type: 'children, value, onChange, defaultCountry, country, onCountryChange, disabled, aria-invalid, locale, countryLabel, searchPlaceholder, emptyMessage, pinnedGroupLabel, allGroupLabel',
    defaultValue: 'defaultCountry="US"; locale="en"',
    description:
      'Provides shared state and overridable picker strings. value/onChange use E.164. Without PhoneInputCountry, foreign +codes stay international and the root country remains fixed; with an uncontrolled PhoneInputCountry mounted, international values select their country and pasted +codes switch the picker. country/onCountryChange optionally control the selected country.',
  },
  {
    name: 'PhoneInputCountry',
    type: 'pinnedCountries, countries, locale, countryLabel, searchPlaceholder, emptyMessage, pinnedGroupLabel, allGroupLabel',
    defaultValue: 'inherits picker options from PhoneInputRoot',
    description:
      'Renders the base-specific country picker. Picker options passed here override matching root options.',
  },
  {
    name: 'PhoneInputNumber',
    type: 'InputHTMLAttributes<HTMLInputElement> (except value, onChange, defaultValue)',
    defaultValue: 'placeholder="Phone number"',
    description:
      'Renders the formatted national number for the root calling code or keeps a foreign +code internationally formatted. Forwards input props and ref, including id and ARIA attributes.',
  },
  {
    name: 'PhoneInputNumber ref',
    type: 'Ref<HTMLInputElement>',
    defaultValue: 'undefined',
    description: 'Ref forwarded to the underlying number input.',
  },
];
