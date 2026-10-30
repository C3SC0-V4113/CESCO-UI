'use client';

import { useState } from 'react';

import { PhoneInput as AriaPhoneInput } from '@/registry/bases/aria/phone-input/phone-input';
import { PhoneInput as BasePhoneInput } from '@/registry/bases/base/phone-input/phone-input';
import { PhoneInput as RadixPhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

import type { DemoProps } from '@/app/components/_demos/types';

export default function PhoneInputInteractive({ base }: DemoProps) {
  const [allCountriesValue, setAllCountriesValue] = useState('');
  const [limitedCountriesValue, setLimitedCountriesValue] = useState('');
  const Component = { base: BasePhoneInput, radix: RadixPhoneInput, aria: AriaPhoneInput }[base];
  return (
    <div className="grid max-w-sm gap-6">
      <div className="grid gap-2">
        <label htmlFor="phone-input-all-countries" className="text-sm font-medium">
          Phone number (all countries)
        </label>
        <Component
          id="phone-input-all-countries"
          value={allCountriesValue}
          onChange={setAllCountriesValue}
          defaultCountry="SV"
          pinnedCountries={['US', 'CA']}
        />
        <p className="text-sm text-muted-foreground">
          E.164: {allCountriesValue || 'Enter a number'}
        </p>
      </div>
      <div className="grid gap-2">
        <label htmlFor="phone-input-limited-countries" className="text-sm font-medium">
          Phone number (El Salvador and United States)
        </label>
        <Component
          id="phone-input-limited-countries"
          value={limitedCountriesValue}
          onChange={setLimitedCountriesValue}
          defaultCountry="SV"
          countries={['SV', 'US']}
        />
      </div>
    </div>
  );
}
