'use client';

import { useState } from 'react';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function DefaultExample() {
  const [allCountriesValue, setAllCountriesValue] = useState('');
  const [limitedCountriesValue, setLimitedCountriesValue] = useState('');

  return (
    <div className="grid max-w-sm gap-6">
      <div className="grid gap-2">
        <label htmlFor="phone-input-all-countries" className="text-sm font-medium">
          Phone number (all countries)
        </label>
        <PhoneInput
          id="phone-input-all-countries"
          defaultCountry="SV"
          pinnedCountries={['US', 'CA']}
          value={allCountriesValue}
          onChange={setAllCountriesValue}
        />
        <p aria-live="polite" className="text-sm text-muted-foreground">
          E.164: {allCountriesValue || 'Enter a number'}
        </p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone-input-limited-countries" className="text-sm font-medium">
          Phone number (El Salvador and United States)
        </label>
        <PhoneInput
          id="phone-input-limited-countries"
          defaultCountry="SV"
          countries={['SV', 'US']}
          value={limitedCountriesValue}
          onChange={setLimitedCountriesValue}
        />
      </div>
    </div>
  );
}
