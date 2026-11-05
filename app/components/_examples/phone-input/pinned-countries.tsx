'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function PinnedCountriesExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-pinned" className="text-sm font-medium">
        Phone number
      </label>
      <PhoneInput id="phone-pinned" pinnedCountries={['US', 'CA', 'SV']} defaultCountry="SV" />
    </div>
  );
}
