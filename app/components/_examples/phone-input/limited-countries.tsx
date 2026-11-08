'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/preview/phone-input';

export default function LimitedCountriesExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-limited">US or El Salvador phone number</FieldLabel>
      <PhoneInput id="phone-limited" countries={['US', 'SV']} defaultCountry="US" />
    </Field>
  );
}
