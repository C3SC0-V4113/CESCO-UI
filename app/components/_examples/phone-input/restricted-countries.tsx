'use client';

import { PhoneInput } from '@/components/phone-input';

export default function RestrictedCountriesExample() {
  return (
    <PhoneInput
      aria-label="US or El Salvador phone number"
      countries={['US', 'SV']}
      defaultCountry="US"
    />
  );
}
