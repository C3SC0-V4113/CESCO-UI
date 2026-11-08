'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/preview/phone-input';

export default function DisabledExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-disabled">Phone number</FieldLabel>
      <PhoneInput id="phone-disabled" disabled />
    </Field>
  );
}
