import { PasswordInput as AriaPasswordInput } from '@/registry/bases/aria/password-input/password-input';
import { PasswordInput as BasePasswordInput } from '@/registry/bases/base/password-input/password-input';
import { PasswordInput as RadixPasswordInput } from '@/registry/bases/radix/password-input/password-input';

import type { DemoProps } from '@/app/components/_demos/types';

export default function PasswordInputDemo({ base }: DemoProps) {
  const PasswordInput = {
    base: BasePasswordInput,
    radix: RadixPasswordInput,
    aria: AriaPasswordInput,
  }[base];

  return (
    <div className="max-w-sm space-y-2">
      <label htmlFor="demo-password" className="text-sm font-medium">
        Password
      </label>
      <PasswordInput id="demo-password" autoComplete="current-password" />
    </div>
  );
}
