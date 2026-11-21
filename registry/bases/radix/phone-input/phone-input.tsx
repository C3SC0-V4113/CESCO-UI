'use client';

import { Input } from '@/registry/bases/radix/ui/input';
import {
  PhoneInputCore,
  PhoneInputCountryCore,
  PhoneInputNumberCore,
  PhoneInputRoot as SharedPhoneInputRoot,
  type PhoneInputCountryProps,
  type PhoneInputNumberProps,
  type PhoneInputProps,
  type PhoneInputRootProps,
} from '@/registry/shared/components/phone-input';

import { CountryPicker } from './country-picker';

export function PhoneInput(props: PhoneInputProps) {
  return <PhoneInputCore {...props} CountrySelector={CountryPicker} InputComponent={Input} />;
}

export function PhoneInputRoot(props: PhoneInputRootProps) {
  return <SharedPhoneInputRoot {...props} />;
}

export function PhoneInputCountry(props: PhoneInputCountryProps) {
  return <PhoneInputCountryCore {...props} CountrySelector={CountryPicker} />;
}

export function PhoneInputNumber(props: PhoneInputNumberProps) {
  return <PhoneInputNumberCore {...props} InputComponent={Input} />;
}

export type { PhoneInputCountryProps, PhoneInputNumberProps, PhoneInputProps, PhoneInputRootProps };
