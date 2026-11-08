'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PasswordInput } from '@/registry/preview/password-input';

export default function CustomLabelsExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="password-custom">Account secret</FieldLabel>
      <PasswordInput
        id="password-custom"
        showLabel="Reveal account secret"
        hideLabel="Conceal account secret"
      />
    </Field>
  );
}
