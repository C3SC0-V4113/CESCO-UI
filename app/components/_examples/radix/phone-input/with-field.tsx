'use client';

import { useState } from 'react';

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

export default function PhoneInputWithFieldExample() {
  const [value, setValue] = useState('');

  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-field">Phone number</FieldLabel>
      <PhoneInput id="phone-field" value={value} onChange={setValue} />
      <FieldDescription>E.164: {value || 'Enter a number'}</FieldDescription>
    </Field>
  );
}
