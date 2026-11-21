'use client';

import { cn } from 'cn';
import { getCountries, getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ComponentType,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';

import {
  deriveFromValue,
  deriveFromValueWithFixedCountry,
  formatInternational,
  formatNational,
  toE164,
  toE164International,
} from '../lib/phone';

import type { CountryPickerProps } from './country-picker-base';

const EMPTY_PINNED_COUNTRIES: CountryCode[] = [];
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;

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

export type PhoneInputRootProps = Pick<
  PhoneInputProps,
  | 'value'
  | 'onChange'
  | 'defaultCountry'
  | 'disabled'
  | 'aria-invalid'
  | 'locale'
  | 'countryLabel'
  | 'searchPlaceholder'
  | 'emptyMessage'
  | 'pinnedGroupLabel'
  | 'allGroupLabel'
> & {
  country?: CountryCode;
  onCountryChange?: (country: CountryCode) => void;
  children: ReactNode;
};

type PhoneInputRootInternalProps = PhoneInputRootProps & {
  hasInitialCountryPicker?: boolean;
};

export type PhoneInputCountryProps = Pick<
  PhoneInputProps,
  | 'pinnedCountries'
  | 'countries'
  | 'locale'
  | 'countryLabel'
  | 'searchPlaceholder'
  | 'emptyMessage'
  | 'pinnedGroupLabel'
  | 'allGroupLabel'
>;

export type PhoneInputNumberProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'defaultValue'
> & {
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
};

type PhoneInputContextValue = {
  country: CountryCode;
  national: string;
  disabled?: boolean;
  invalid?: InputHTMLAttributes<HTMLInputElement>['aria-invalid'];
  locale: string;
  countryLabel: string;
  searchPlaceholder: string;
  emptyMessage: string;
  pinnedCountries: CountryCode[];
  countries?: CountryCode[];
  pinnedGroupLabel: string;
  allGroupLabel: string;
  setCountry: (country: CountryCode) => void;
  onNumberChange: (raw: string, input: HTMLInputElement) => void;
  registerCountryPicker: () => () => void;
};

const PhoneInputContext = createContext<PhoneInputContextValue | null>(null);

function usePhoneInputContext() {
  const context = useContext(PhoneInputContext);
  if (!context) throw new Error('PhoneInput parts must be used within PhoneInputRoot.');
  return context;
}

function caretAfterDigits(value: string, digitCount: number) {
  if (digitCount === 0) return 0;
  let digits = 0;
  for (let index = 0; index < value.length; index++) {
    const character = value[index];
    if (character >= '0' && character <= '9' && ++digits === digitCount) return index + 1;
  }
  return value.length;
}

export function PhoneInputRoot({
  children,
  value,
  onChange,
  defaultCountry = 'US',
  country: controlledCountry,
  onCountryChange,
  disabled,
  'aria-invalid': invalid,
  locale = 'en',
  countryLabel = 'Country',
  searchPlaceholder = 'Search country',
  emptyMessage = 'No results',
  pinnedGroupLabel = 'Suggested',
  allGroupLabel = 'All countries',
  hasInitialCountryPicker = false,
}: PhoneInputRootInternalProps) {
  const rootCountry = controlledCountry ?? defaultCountry;
  const [state, setState] = useState(() => ({
    propValue: value,
    lastEmittedValue: undefined as string | undefined,
    // PhoneInput's hint keeps SSR and first-client output aligned. Composed roots discover a picker after mount and reconcile then.
    ...(hasInitialCountryPicker
      ? deriveFromValue(value, rootCountry)
      : deriveFromValueWithFixedCountry(value, rootCountry)),
  }));
  const countryPickerCount = useRef(0);
  const pendingCaret = useRef<{ input: HTMLInputElement; position: number } | null>(null);
  useLayoutEffect(() => {
    const pending = pendingCaret.current;
    if (!pending) return;
    pendingCaret.current = null;
    if (pending.input.isConnected && document.activeElement === pending.input) {
      pending.input.setSelectionRange(pending.position, pending.position);
    }
  }, [state.national]);
  useIsomorphicLayoutEffect(() => {
    if (value === state.propValue) return;
    const isEcho = value === state.lastEmittedValue;
    setState({
      ...(isEcho
        ? state
        : countryPickerCount.current > 0
          ? deriveFromValue(value, rootCountry)
          : deriveFromValueWithFixedCountry(value, rootCountry)),
      propValue: value,
      lastEmittedValue: undefined,
    });
  }, [rootCountry, state, value]);

  const selectedCountry = controlledCountry ?? state.country;
  const national = state.national;
  const registerCountryPicker = useCallback(() => {
    countryPickerCount.current += 1;
    if (countryPickerCount.current === 1 && !controlledCountry) {
      const derived = deriveFromValue(value, rootCountry);
      setState((current) => {
        if (
          current.propValue !== value ||
          current.lastEmittedValue ||
          (current.country === derived.country && current.national === derived.national)
        ) {
          return current;
        }
        return { ...current, ...derived };
      });
    }
    return () => {
      countryPickerCount.current = Math.max(0, countryPickerCount.current - 1);
    };
  }, [controlledCountry, rootCountry, value]);
  const emit = useCallback(
    (
      nextCountry: CountryCode,
      digits: string,
      display: string,
      emittedValue = toE164(nextCountry, digits)
    ) => {
      setState((current) => ({
        ...current,
        country: nextCountry,
        national: display,
        lastEmittedValue: emittedValue,
      }));
      if (nextCountry !== selectedCountry) onCountryChange?.(nextCountry);
      onChange?.(emittedValue);
    },
    [onChange, onCountryChange, selectedCountry]
  );
  const setCountry = useCallback(
    (nextCountry: CountryCode) => {
      const digits = national.replace(/\D/g, '');
      emit(nextCountry, digits, formatNational(nextCountry, digits));
    },
    [emit, national]
  );
  const onNumberChange = useCallback(
    (raw: string, input: HTMLInputElement) => {
      const previousDigits = national.replace(/\D/g, '');
      const deleting = raw.length < national.length;
      const digits = raw.replace(/\D/g, '');
      if (raw.trimStart().startsWith('+')) {
        const hasCallingCodePrefix = getCountries().some((candidate) =>
          digits.startsWith(getCountryCallingCode(candidate))
        );
        if (!hasCallingCodePrefix) {
          setState((current) => ({ ...current, national: raw }));
          return;
        }
        const callingCode = getCountries()
          .map((candidate) => ({ country: candidate, calling: getCountryCallingCode(candidate) }))
          .filter(({ calling }) => digits.startsWith(calling))
          .sort((a, b) => b.calling.length - a.calling.length)[0];
        const matchesRootCountry = callingCode?.calling === getCountryCallingCode(selectedCountry);
        const nextDigits = matchesRootCountry ? digits.slice(callingCode.calling.length) : digits;
        // A root without a mounted country picker keeps its country fixed.
        if (countryPickerCount.current > 0) {
          const derived = deriveFromValue(raw, selectedCountry);
          emit(derived.country, derived.national.replace(/\D/g, ''), derived.national);
          return;
        }
        if (matchesRootCountry) {
          emit(selectedCountry, nextDigits, formatNational(selectedCountry, nextDigits));
        } else {
          emit(selectedCountry, digits, formatInternational(raw), toE164International(raw));
        }
        return;
      }
      const deletingDigit = digits.length < previousDigits.length;
      const display =
        deleting && !deletingDigit
          ? raw.replace(/\+/g, '')
          : formatNational(selectedCountry, digits);
      if (deletingDigit) {
        const selectionStart = input.selectionStart ?? raw.length;
        const digitsBeforeCaret = raw.slice(0, selectionStart).replace(/\D/g, '').length;
        pendingCaret.current = {
          input,
          position: caretAfterDigits(display, digitsBeforeCaret),
        };
      }
      emit(selectedCountry, digits, display);
    },
    [emit, national, selectedCountry]
  );

  const context = useMemo<PhoneInputContextValue>(
    () => ({
      country: selectedCountry,
      national,
      disabled,
      invalid,
      locale,
      countryLabel,
      searchPlaceholder,
      emptyMessage,
      pinnedCountries: EMPTY_PINNED_COUNTRIES,
      pinnedGroupLabel,
      allGroupLabel,
      setCountry,
      onNumberChange,
      registerCountryPicker,
    }),
    [
      selectedCountry,
      national,
      disabled,
      invalid,
      locale,
      countryLabel,
      searchPlaceholder,
      emptyMessage,
      pinnedGroupLabel,
      allGroupLabel,
      setCountry,
      onNumberChange,
      registerCountryPicker,
    ]
  );
  return <PhoneInputContext.Provider value={context}>{children}</PhoneInputContext.Provider>;
}

export function PhoneInputCountryCore({
  CountrySelector,
  pinnedCountries,
  countries,
  locale,
  countryLabel,
  searchPlaceholder,
  emptyMessage,
  pinnedGroupLabel,
  allGroupLabel,
}: PhoneInputCountryProps & { CountrySelector: ComponentType<CountryPickerProps> }) {
  const context = usePhoneInputContext();
  useIsomorphicLayoutEffect(() => context.registerCountryPicker(), [context.registerCountryPicker]);
  return (
    <CountrySelector
      country={context.country}
      onCountryChange={context.setCountry}
      isDisabled={context.disabled}
      countryLabel={countryLabel ?? context.countryLabel}
      searchPlaceholder={searchPlaceholder ?? context.searchPlaceholder}
      emptyMessage={emptyMessage ?? context.emptyMessage}
      pinnedCountries={pinnedCountries ?? context.pinnedCountries}
      countries={countries ?? context.countries}
      pinnedGroupLabel={pinnedGroupLabel ?? context.pinnedGroupLabel}
      allGroupLabel={allGroupLabel ?? context.allGroupLabel}
      locale={locale ?? context.locale}
      isInvalid={
        context.invalid === true ||
        (typeof context.invalid === 'string' && context.invalid !== 'false')
      }
    />
  );
}

type PhoneInputNumberCoreProps = PhoneInputNumberProps & {
  InputComponent: ComponentType<
    InputHTMLAttributes<HTMLInputElement> & { ref?: Ref<HTMLInputElement> }
  >;
};

export function PhoneInputNumberCore({
  InputComponent,
  placeholder = 'Phone number',
  ref,
  className,
  disabled: numberDisabled,
  'aria-invalid': numberInvalid,
  ...props
}: PhoneInputNumberCoreProps) {
  const context = usePhoneInputContext();
  return (
    <InputComponent
      {...props}
      ref={ref}
      type="tel"
      inputMode="tel"
      autoComplete="tel-national"
      placeholder={placeholder}
      className={cn('min-w-0 flex-1', className)}
      value={context.national}
      onChange={(event: ChangeEvent<HTMLInputElement>) =>
        context.onNumberChange(event.currentTarget.value, event.currentTarget)
      }
      disabled={context.disabled ?? numberDisabled}
      aria-invalid={context.invalid ?? numberInvalid}
    />
  );
}

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
  return (
    <PhoneInputRoot
      value={value}
      onChange={onChange}
      defaultCountry={defaultCountry}
      disabled={disabled}
      aria-invalid={invalid}
      locale={locale}
      countryLabel={countryLabel}
      searchPlaceholder={searchPlaceholder}
      emptyMessage={emptyMessage}
      pinnedGroupLabel={pinnedGroupLabel}
      allGroupLabel={allGroupLabel}
      hasInitialCountryPicker
    >
      <div data-slot="phone-input" className="flex items-stretch gap-2">
        <PhoneInputCountryCore
          CountrySelector={CountrySelector}
          pinnedCountries={pinnedCountries}
          countries={countries}
        />
        <PhoneInputNumberCore
          InputComponent={InputComponent}
          {...props}
          id={id}
          ref={ref}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={invalid}
          className={className}
          placeholder={placeholder}
        />
      </div>
    </PhoneInputRoot>
  );
}
