'use client';

import { useState } from 'react';

import { Field, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/registry/preview/password-input';

export default function DefaultExample() {
  const [value, setValue] = useState('');

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="password-default">Password</FieldLabel>
      <PasswordInput
        id="password-default"
        autoComplete="current-password"
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </Field>
  );
}
