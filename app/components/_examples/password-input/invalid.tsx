'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/registry/preview/password-input';

export default function InvalidExample() {
  return (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="password-invalid">Password</FieldLabel>
      <PasswordInput
        id="password-invalid"
        aria-invalid="true"
        aria-describedby="password-invalid-message"
      />
      <FieldError id="password-invalid-message">Use at least 12 characters.</FieldError>
    </Field>
  );
}
