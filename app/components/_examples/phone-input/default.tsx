'use client';

import { useState } from 'react';

import { PhoneInput } from '@/components/phone-input';

export default function DefaultExample() {
  const [value, setValue] = useState('');

  return (
    <div className="grid max-w-sm gap-3">
      <PhoneInput aria-label="Phone number" defaultCountry="US" value={value} onChange={setValue} />
      <p aria-live="polite" className="text-sm text-muted-foreground">
        E.164: {value || 'Enter a number'}
      </p>
    </div>
  );
}
