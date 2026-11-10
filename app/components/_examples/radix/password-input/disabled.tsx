'use client';

import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/registry/bases/radix/password-input/password-input';

export default function DisabledExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="password-disabled">Disabled password</Label>
      <PasswordInput id="password-disabled" disabled placeholder="Password is unavailable" />
    </div>
  );
}
