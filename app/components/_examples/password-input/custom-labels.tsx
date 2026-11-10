'use client';

import { PasswordInput } from '@/components/password-input';

export default function CustomLabelsExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="password-custom" className="text-sm font-medium">
        Account secret
      </label>
      <PasswordInput
        id="password-custom"
        showLabel="Reveal account secret"
        hideLabel="Conceal account secret"
      />
    </div>
  );
}
