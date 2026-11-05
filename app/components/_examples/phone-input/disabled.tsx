'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function DisabledExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-disabled" className="text-sm font-medium">
        Phone number
      </label>
      <PhoneInput id="phone-disabled" disabled />
    </div>
  );
}
