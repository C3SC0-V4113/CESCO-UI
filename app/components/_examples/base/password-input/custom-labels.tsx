'use client';

import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/registry/bases/base/password-input/password-input';

export default function CustomLabelsExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="password-custom">Account secret</Label>
      <PasswordInput
        id="password-custom"
        showLabel="Reveal account secret"
        hideLabel="Conceal account secret"
      />
    </div>
  );
}
