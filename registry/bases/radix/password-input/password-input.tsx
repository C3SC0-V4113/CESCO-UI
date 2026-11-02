'use client';

import { cn } from 'cn';
import { useState, type ComponentProps } from 'react';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/registry/bases/radix/ui/input-group';
import { IconPlaceholder } from '@/registry/shared/lib/icon-placeholder';

type PasswordInputProps = Omit<ComponentProps<typeof InputGroupInput>, 'type'> & {
  /** Accessible name of the toggle while the password is hidden. */
  showLabel?: string;
  /** Accessible name of the toggle while the password is visible. */
  hideLabel?: string;
};

function PasswordInput({
  className,
  showLabel = 'Show password',
  hideLabel = 'Hide password',
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <InputGroup data-slot="password-input" className={className}>
      <InputGroupInput
        {...props}
        type={visible ? 'text' : 'password'}
        className="[&::-ms-reveal]:hidden"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label={visible ? hideLabel : showLabel}
          disabled={props.disabled}
          onClick={() => setVisible((current) => !current)}
        >
          <span aria-hidden="true" className="grid place-items-center">
            <IconPlaceholder
              lucide="EyeIcon"
              tabler="IconEye"
              hugeicons="EyeIcon"
              phosphor="EyeIcon"
              remixicon="RiEyeLine"
              className={cn(
                'col-start-1 row-start-1 transition duration-200 motion-reduce:transition-none',
                visible ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              )}
            />
            <IconPlaceholder
              lucide="EyeOffIcon"
              tabler="IconEyeOff"
              hugeicons="EyeOffIcon"
              phosphor="EyeSlashIcon"
              remixicon="RiEyeOffLine"
              className={cn(
                'col-start-1 row-start-1 transition duration-200 motion-reduce:transition-none',
                visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            />
          </span>
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}

export { PasswordInput };
