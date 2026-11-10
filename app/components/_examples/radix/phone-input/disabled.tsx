'use client';

import { Label } from '@/components/ui/label';
import { PhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

export default function DisabledExample() {
  return (
    <div className="grid max-w-sm gap-3">
      <Label htmlFor="phone-disabled">Phone number</Label>
      <PhoneInput id="phone-disabled" disabled />
    </div>
  );
}
