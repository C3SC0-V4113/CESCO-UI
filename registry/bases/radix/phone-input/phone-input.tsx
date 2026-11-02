'use client';

import { Input } from '@/registry/bases/radix/ui/input';
import { PhoneInputCore, type PhoneInputProps } from '@/registry/shared/components/phone-input';

import { CountryPicker } from './country-picker';

export function PhoneInput(props: PhoneInputProps) {
  return <PhoneInputCore {...props} CountrySelector={CountryPicker} InputComponent={Input} />;
}

export type { PhoneInputProps };
