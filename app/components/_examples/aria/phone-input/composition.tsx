'use client';

import { useState } from 'react';

import {
  PhoneInputCountry,
  PhoneInputNumber,
  PhoneInputRoot,
} from '@/registry/bases/aria/phone-input/phone-input';

export default function CompositionExample() {
  const [value, setValue] = useState('');

  return (
    // react-doctor-disable-next-line duplicate-jsx-subtree
    <div className="grid max-w-sm gap-3">
      <label htmlFor="phone-composed" className="text-sm font-medium">
        Phone number
      </label>
      <PhoneInputRoot defaultCountry="SV" value={value} onChange={setValue}>
        <div className="flex flex-col gap-2">
          <PhoneInputNumber id="phone-composed" />
          <PhoneInputCountry pinnedCountries={['SV', 'US']} />
        </div>
      </PhoneInputRoot>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        E.164: {value || 'Enter a number'}
      </p>
    </div>
  );
}
