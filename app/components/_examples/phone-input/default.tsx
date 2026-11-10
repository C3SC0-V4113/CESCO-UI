'use client';

import { useState } from 'react';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/preview/phone-input';

export default function DefaultExample() {
  const [allCountriesValue, setAllCountriesValue] = useState('');
  const [limitedCountriesValue, setLimitedCountriesValue] = useState('');

  return (
    <div className="grid max-w-sm gap-6">
      <Field>
        <FieldLabel htmlFor="phone-input-all-countries">Phone number (all countries)</FieldLabel>
        <PhoneInput
          id="phone-input-all-countries"
          defaultCountry="SV"
          pinnedCountries={['US', 'CA']}
          value={allCountriesValue}
          onChange={setAllCountriesValue}
        />
        <FieldDescription aria-live="polite">
          E.164: {allCountriesValue || 'Enter a number'}
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="phone-input-limited-countries">
          Phone number (El Salvador and United States)
        </FieldLabel>
        <PhoneInput
          id="phone-input-limited-countries"
          defaultCountry="SV"
          countries={['SV', 'US']}
          value={limitedCountriesValue}
          onChange={setLimitedCountriesValue}
        />
      </Field>
    </div>
  );
}
