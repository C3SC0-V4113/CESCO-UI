'use client';

import { useState } from 'react';

import { PasswordInput } from '@/components/password-input';

export default function DefaultExample() {
  const [value, setValue] = useState('');

  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="password-default" className="text-sm font-medium">
        Password
      </label>
      <PasswordInput
        id="password-default"
        autoComplete="current-password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
