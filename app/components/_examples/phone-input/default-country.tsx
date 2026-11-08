'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/preview/phone-input';

export default function DefaultCountryExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-default-country">Phone number in El Salvador</FieldLabel>
      <PhoneInput id="phone-default-country" defaultCountry="SV" />
    </Field>
  );
}
