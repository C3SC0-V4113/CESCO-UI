'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function LimitedCountriesExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-limited" className="text-sm font-medium">
        US or El Salvador phone number
      </label>
      <PhoneInput id="phone-limited" countries={['US', 'SV']} defaultCountry="US" />
    </div>
  );
}
