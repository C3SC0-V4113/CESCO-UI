'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function InvalidExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-invalid" className="text-sm font-medium">
        Phone number
      </label>
      <PhoneInput id="phone-invalid" aria-invalid="true" aria-describedby="phone-invalid-message" />
      <p id="phone-invalid-message" className="text-sm text-destructive">
        Enter a valid phone number.
      </p>
    </div>
  );
}
