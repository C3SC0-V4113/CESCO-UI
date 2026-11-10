'use client';

import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import { Fragment, useMemo, useState, type ComponentProps, type KeyboardEvent } from 'react';
import { Autocomplete, useFilter } from 'react-aria-components';

import {
  Select,
  SelectEmpty,
  SelectGroup,
  SelectInput,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectPopover,
  SelectSeparator,
  SelectTrigger,
} from '@/registry/bases/aria/ui/select';
import { CountryFlag } from '@/registry/shared/components/country-flag';
import { getCountryOptions } from '@/registry/shared/lib/phone';

import type { CountryPickerProps } from '@/registry/shared/components/country-picker-base';

export function CountryPicker({
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
}: CountryPickerProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const filter = useFilter({ sensitivity: 'base' });
  const { pinned, all } = useMemo(
    () => getCountryOptions(locale, pinnedCountries, countries),
    [locale, pinnedCountries, countries]
  );
  const groups = useMemo(
    () =>
      pinned.length
        ? [
            { label: pinnedGroupLabel, items: pinned },
            { label: allGroupLabel, items: all },
          ]
        : [{ label: allGroupLabel, items: all }],
    [all, allGroupLabel, pinned, pinnedGroupLabel]
  );
  const matchesText = (textValue: string, value = query) => {
    const normalizedQuery = value.trim();
    return (
      !normalizedQuery ||
      filter.contains(textValue, normalizedQuery) ||
      textValue.includes(normalizedQuery.replace(/^\+/, ''))
    );
  };

  const searchInputProps = {
    'aria-label': searchPlaceholder,
    placeholder: searchPlaceholder,
    value: query,
    onChange: setQuery,
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      const matches = groups
        .flatMap((group) => group.items)
        .filter((option) => matchesText(`${option.name} +${option.calling}`));
      if (matches.length !== 1) return;
      event.preventDefault();
      onCountryChange(matches[0].code);
      setIsOpen(false);
      setQuery('');
    },
  } as ComponentProps<typeof SelectInput> & { placeholder: string };

  return (
    <Select
      data-slot="phone-country-select"
      aria-label={countryLabel}
      isOpen={isOpen}
      selectedKey={country}
      onSelectionChange={(key) => {
        if (typeof key === 'string') onCountryChange(key as CountryCode);
        setQuery('');
      }}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setQuery('');
      }}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
    >
      <SelectTrigger data-slot="phone-country-select-trigger" aria-label={countryLabel}>
        <CountryFlag country={country} className="h-3.5 w-5 rounded-xs object-cover" />
        <span>+{getCountryCallingCode(country)}</span>
      </SelectTrigger>
      <SelectPopover>
        <Autocomplete filter={(textValue) => matchesText(textValue)}>
          <SelectInput {...searchInputProps} />
          <SelectList
            aria-label={countryLabel}
            renderEmptyState={() => (
              <SelectEmpty data-slot="phone-country-empty" role="status">
                {emptyMessage}
              </SelectEmpty>
            )}
          >
            {groups.map((group, index) => (
              <Fragment key={group.label}>
                {index > 0 &&
                  pinned.some((option) => matchesText(`${option.name} +${option.calling}`)) && (
                    <SelectSeparator />
                  )}
                <SelectGroup id={group.label}>
                  <SelectLabel>{group.label}</SelectLabel>
                  {group.items.map((option) => (
                    <SelectItem
                      key={option.code}
                      id={option.code}
                      textValue={`${option.name} +${option.calling}`}
                    >
                      <CountryFlag
                        country={option.code}
                        className="h-3.5 w-5 rounded-xs object-cover"
                      />
                      <span>{option.name}</span>
                      <span className="text-muted-foreground">+{option.calling}</span>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </Fragment>
            ))}
          </SelectList>
        </Autocomplete>
      </SelectPopover>
    </Select>
  );
}
