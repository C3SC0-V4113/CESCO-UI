'use client';

import { useState } from 'react';

import { PhoneInputNumber, PhoneInputRoot } from '@/registry/bases/base/phone-input/phone-input';

export default function WithoutCountryPickerExample() {
  const [value, setValue] = useState('');

  return (
    <div className="grid max-w-sm gap-3">
      <label htmlFor="phone-fixed-country" className="text-sm font-medium">
        Phone number
      </label>
      <PhoneInputRoot defaultCountry="SV" value={value} onChange={setValue}>
        <PhoneInputNumber id="phone-fixed-country" />
      </PhoneInputRoot>
      <p aria-live="polite" className="text-sm text-muted-foreground">
        E.164: {value || 'Enter a number'}
      </p>
    </div>
  );
}
