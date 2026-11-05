'use client';

import { useComponentBase } from '@/app/components/_components/base-context';
import { PhoneInput as AriaPhoneInput } from '@/registry/bases/aria/phone-input/phone-input';
import { PhoneInput as BasePhoneInput } from '@/registry/bases/base/phone-input/phone-input';
import { PhoneInput as RadixPhoneInput } from '@/registry/bases/radix/phone-input/phone-input';

import { usePreviewHydrated } from './use-preview-hydrated';

export function PhoneInput(props: React.ComponentProps<typeof BasePhoneInput>) {
  const base = useComponentBase();
  const isHydrated = usePreviewHydrated();
  const Input = { base: BasePhoneInput, radix: RadixPhoneInput, aria: AriaPhoneInput }[base];

  return (
    <div data-preview-base={base} data-preview-hydrated={isHydrated}>
      <Input {...props} />
    </div>
  );
}
