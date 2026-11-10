'use client';

import { Label } from '@/components/ui/label';
import { PasswordInput } from '@/registry/bases/base/password-input/password-input';

export default function InvalidExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <Label htmlFor="password-invalid">Password</Label>
      <PasswordInput
        id="password-invalid"
        aria-invalid="true"
        aria-describedby="password-invalid-message"
      />
      <p id="password-invalid-message" className="text-sm text-destructive">
        Use at least 12 characters.
      </p>
    </div>
  );
}
