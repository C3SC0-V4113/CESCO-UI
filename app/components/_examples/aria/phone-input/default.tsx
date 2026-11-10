'use client';

import { useState } from 'react';

import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/registry/bases/aria/phone-input/phone-input';

export default function DefaultExample() {
  const [value, setValue] = useState('');

  return (
    <div className="grid max-w-sm gap-3">
      <Label htmlFor="phone-default">Phone number</Label>
      <PhoneInput id="phone-default" defaultCountry="US" value={value} onChange={setValue} />
      <p aria-live="polite" className="text-sm text-muted-foreground">
        E.164: {value || 'Enter a number'}
      </p>
    </div>
  );
}
