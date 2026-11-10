'use client';

import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

export default function DefaultCountryExample() {
  return (
    <div className="grid max-w-sm gap-3">
      <Label htmlFor="phone-default-country">Phone number in El Salvador</Label>
      <PhoneInput id="phone-default-country" defaultCountry="SV" />
    </div>
  );
}
