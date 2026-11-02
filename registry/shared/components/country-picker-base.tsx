'use client';

import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import { Fragment, useMemo, type ComponentType, type ElementType } from 'react';

import { CountryFlag } from './country-flag';
import { getCountryOptions, type CountryOption } from '../lib/phone';

export type CountryPickerProps = {
  country: CountryCode;
  onCountryChange: (country: CountryCode) => void;
  isDisabled?: boolean;
  countryLabel: string;
  searchPlaceholder: string;
  emptyMessage: string;
  pinnedCountries: CountryCode[];
  countries?: CountryCode[];
  pinnedGroupLabel: string;
  allGroupLabel: string;
  locale: string;
  isInvalid?: boolean;
};

type CountryGroup = { label: string; items: CountryOption[] };
type TriggerButtonProps = { variant: 'outline'; className: string };
export type ComboboxApi = {
  [
    key in
      | 'Combobox'
      | 'ComboboxTrigger'
      | 'ComboboxContent'
      | 'ComboboxInput'
      | 'ComboboxEmpty'
      | 'ComboboxList'
      | 'ComboboxGroup'
      | 'ComboboxLabel'
      | 'ComboboxCollection'
      | 'ComboboxSeparator'
      | 'ComboboxItem'
  ]: ElementType;
};

function CountryPicker({
  api,
  TriggerButton,
  ...props
}: CountryPickerProps & {
  api: ComboboxApi;
  TriggerButton: ComponentType<TriggerButtonProps>;
}) {
  const {
    country,
    onCountryChange,
    isDisabled,
    countryLabel,
    searchPlaceholder,
    emptyMessage,
    pinnedCountries,
    countries,
    pinnedGroupLabel,
    allGroupLabel,
    locale,
    isInvalid,
  } = props;
  const { pinned, all, options } = useMemo(
    () => getCountryOptions(locale, pinnedCountries, countries),
    [locale, pinnedCountries, countries]
  );
  const selected = options.find((option) => option.code === country) ?? null;
  const groups: CountryGroup[] = pinned.length
    ? [
        { label: pinnedGroupLabel, items: pinned },
        { label: allGroupLabel, items: all },
      ]
    : [{ label: allGroupLabel, items: all }];
  const {
    Combobox,
    ComboboxTrigger,
    ComboboxContent,
    ComboboxInput,
    ComboboxEmpty,
    ComboboxList,
    ComboboxGroup,
    ComboboxLabel,
    ComboboxCollection,
    ComboboxSeparator,
    ComboboxItem,
  } = api;

  return (
    <Combobox
      items={groups}
      value={selected}
      onValueChange={(option: CountryOption | null) => {
        if (option) onCountryChange(option.code);
      }}
      itemToStringLabel={(option: CountryOption) => `${option.name} +${option.calling}`}
      disabled={isDisabled}
    >
      <ComboboxTrigger
        render={<TriggerButton variant="outline" className="w-fit whitespace-nowrap" />}
        aria-label={countryLabel}
        aria-invalid={isInvalid}
      >
        <CountryFlag country={country} className="h-3.5 w-5 shrink-0 rounded-xs object-cover" />
        <span>+{getCountryCallingCode(country)}</span>
      </ComboboxTrigger>
      <ComboboxContent className="w-72">
        <ComboboxInput
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          showTrigger={false}
        />
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(group: CountryGroup, index: number) => (
            <Fragment key={`${group.label}-${group.items[0]?.code}`}>
              {index > 0 ? <ComboboxSeparator role="separator" /> : null}
              <ComboboxGroup items={group.items}>
                <ComboboxLabel>{group.label}</ComboboxLabel>
                <ComboboxCollection>
                  {(option: CountryOption) => (
                    <ComboboxItem key={option.code} value={option}>
                      <CountryFlag
                        country={option.code}
                        className="h-3.5 w-5 shrink-0 rounded-xs object-cover"
                      />
                      <span className="flex-1 truncate">{option.name}</span>
                      <span className="text-muted-foreground group-data-highlighted:text-accent-foreground">
                        +{option.calling}
                      </span>
                    </ComboboxItem>
                  )}
                </ComboboxCollection>
              </ComboboxGroup>
            </Fragment>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}

export { CountryPicker };
