'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function DefaultCountryExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-default-country" className="text-sm font-medium">
        Phone number in El Salvador
      </label>
      <PhoneInput id="phone-default-country" defaultCountry="SV" />
    </div>
  );
}
