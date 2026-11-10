'use client';

import { PasswordInput } from '@/components/password-input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

export default function PasswordInputWithFieldExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="password-field">Password</FieldLabel>
      <PasswordInput id="password-field" autoComplete="new-password" />
      <FieldDescription>Use at least 12 characters.</FieldDescription>
    </Field>
  );
}
