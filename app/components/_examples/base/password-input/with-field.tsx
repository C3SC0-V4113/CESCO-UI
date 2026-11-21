'use client';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/registry/bases/base/password-input/password-input';

export default function PasswordInputWithFieldExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="password-field">Password</FieldLabel>
      <PasswordInput id="password-field" autoComplete="new-password" />
      <FieldDescription>Use at least 12 characters.</FieldDescription>
    </Field>
  );
}
