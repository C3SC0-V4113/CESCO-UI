'use client';

import { PasswordInput } from '@/components/password-input';

export default function InvalidExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="password-invalid" className="text-sm font-medium">
        Password
      </label>
      <PasswordInput
        id="password-invalid"
        aria-invalid="true"
        aria-describedby="password-invalid-message"
      />
      <p id="password-invalid-message" className="text-sm text-destructive">
        Use at least 12 characters.
      </p>
    </div>
  );
}
