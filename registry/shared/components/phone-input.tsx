'use client';

import { cn } from 'cn';
import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import { useState, type ComponentType, type InputHTMLAttributes, type Ref } from 'react';

import { deriveFromValue, formatNational, toE164 } from '../lib/phone';

import type { CountryPickerProps } from './country-picker-base';

const EMPTY_PINNED_COUNTRIES: CountryCode[] = [];

export type PhoneInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'
> & {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: CountryCode;
  pinnedCountries?: CountryCode[];
  /** Countries offered in the picker. Exclude entries with `getCountries().filter(...)`. */
  countries?: CountryCode[];
  locale?: string;
  countryLabel?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  pinnedGroupLabel?: string;
  allGroupLabel?: string;
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
};

type PhoneInputCoreProps = PhoneInputProps & {
  CountrySelector: ComponentType<CountryPickerProps>;
  InputComponent: ComponentType<
    InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }
  >;
};

export function PhoneInputCore({
  CountrySelector,
  InputComponent,
  value,
  onChange,
  defaultCountry = 'US',
  pinnedCountries = EMPTY_PINNED_COUNTRIES,
  countries,
  locale = 'en',
  countryLabel = 'Country',
  searchPlaceholder = 'Search country',
  emptyMessage = 'No results',
  pinnedGroupLabel = 'Suggested',
  allGroupLabel = 'All countries',
  placeholder = 'Phone number',
  id,
  ref,
  onBlur,
  disabled,
  className,
  'aria-invalid': invalid,
  ...props
}: PhoneInputCoreProps) {
  const [inputState, setInputState] = useState(() => ({
    propValue: value,
    lastEmittedValue: undefined as string | undefined,
    ...deriveFromValue(value, defaultCountry),
  }));
  if (value !== inputState.propValue) {
    const isEcho = value === inputState.lastEmittedValue;
    setInputState({
      ...(isEcho ? inputState : deriveFromValue(value, defaultCountry)),
      propValue: value,
      lastEmittedValue: undefined,
    });
  }
  const { country, national } = inputState;
  function emit(nextCountry: CountryCode, digits: string, display: string) {
    const emittedValue = toE164(nextCountry, digits);
    setInputState((current) => ({
      ...current,
      country: nextCountry,
      national: display,
      lastEmittedValue: emittedValue,
    }));
    onChange?.(emittedValue);
  }
  function handleChange(raw: string) {
    const deleting = raw.length < national.length;
    const digits = raw.replace(/\D/g, '');
    if (raw.trimStart().startsWith('+')) {
      const derived = deriveFromValue(raw, country);
      const hasCallingCodePrefix = getCountries().some((candidate) =>
        digits.startsWith(getCountryCallingCode(candidate))
      );
      if (!hasCallingCodePrefix) {
        setInputState((current) => ({ ...current, national: raw }));
        return;
      }
      const nextDigits = derived.national.replace(/\D/g, '');
      emit(derived.country, nextDigits, derived.national);
      return;
    }
    emit(country, digits, deleting ? raw.replace(/\+/g, '') : formatNational(country, digits));
  }
  return (
    <div data-slot="phone-input" className="flex items-stretch gap-2">
      <CountrySelector
        country={country}
        onCountryChange={(next) => {
          const digits = national.replace(/\D/g, '');
          emit(next, digits, formatNational(next, digits));
        }}
        isDisabled={disabled}
        countryLabel={countryLabel}
        searchPlaceholder={searchPlaceholder}
        emptyMessage={emptyMessage}
        pinnedCountries={pinnedCountries}
        countries={countries}
        pinnedGroupLabel={pinnedGroupLabel}
        allGroupLabel={allGroupLabel}
        locale={locale}
        isInvalid={invalid === true || (typeof invalid === 'string' && invalid !== 'false')}
      />
      <InputComponent
        {...props}
        ref={ref}
        id={id}
        type="tel"
        inputMode="tel"
        autoComplete="tel-national"
        placeholder={placeholder}
        className={cn('min-w-0 flex-1', className)}
        value={national}
        onChange={(event) => handleChange(event.target.value)}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={invalid}
      />
    </div>
  );
}
