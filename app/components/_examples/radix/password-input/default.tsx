'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/registry/bases/radix/password-input/password-input';

export default function DefaultExample() {
  const [value, setValue] = useState('');

  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="password-default">Password</Label>
      <PasswordInput
        id="password-default"
        autoComplete="current-password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </div>
  );
}
