'use client';

import { useComponentBase } from '@/app/components/_components/base-context';
import { PasswordInput as AriaPasswordInput } from '@/registry/bases/aria/password-input/password-input';
import { PasswordInput as BasePasswordInput } from '@/registry/bases/base/password-input/password-input';
import { PasswordInput as RadixPasswordInput } from '@/registry/bases/radix/password-input/password-input';

import { usePreviewHydrated } from './use-preview-hydrated';

export function PasswordInput(props: React.ComponentProps<typeof BasePasswordInput>) {
  const base = useComponentBase();
  const isHydrated = usePreviewHydrated();
  const Input = {
    base: BasePasswordInput,
    radix: RadixPasswordInput,
    aria: AriaPasswordInput,
  }[base];

  return (
    <div data-preview-base={base} data-preview-hydrated={isHydrated}>
      <Input {...props} />
    </div>
  );
}
