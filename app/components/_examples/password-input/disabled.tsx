'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/registry/preview/password-input';

export default function DisabledExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="password-disabled">Disabled password</FieldLabel>
      <PasswordInput id="password-disabled" disabled placeholder="Password is unavailable" />
    </Field>
  );
}
