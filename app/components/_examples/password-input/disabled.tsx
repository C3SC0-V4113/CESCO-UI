'use client';

import { PasswordInput } from '@/components/password-input';

export default function DisabledExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="password-disabled" className="text-sm font-medium">
        Disabled password
      </label>
      <PasswordInput id="password-disabled" disabled placeholder="Password is unavailable" />
    </div>
  );
}
