'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

export default function PinnedCountriesExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-pinned">Phone number</FieldLabel>
      <PhoneInput id="phone-pinned" pinnedCountries={['US', 'CA', 'SV']} defaultCountry="SV" />
    </Field>
  );
}
