'use client';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/bases/aria/phone-input/phone-input';

export default function InvalidExample() {
  return (
    <Field data-invalid="true" className="max-w-sm">
      <FieldLabel htmlFor="phone-invalid">Phone number</FieldLabel>
      <PhoneInput id="phone-invalid" aria-invalid="true" aria-describedby="phone-invalid-message" />
      <FieldError id="phone-invalid-message">Enter a valid phone number.</FieldError>
    </Field>
  );
}
