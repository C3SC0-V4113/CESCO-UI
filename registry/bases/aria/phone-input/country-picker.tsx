'use client';

import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import { useMemo, useRef, useState } from 'react';
import { useFilter } from 'react-aria-components';

import { buttonVariants } from '@/registry/bases/aria/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
} from '@/registry/bases/aria/ui/combobox';
import { CountryFlag } from '@/registry/shared/components/country-flag';
import { getCountryOptions, type CountryOption } from '@/registry/shared/lib/phone';

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
  const triggerRef = useRef<HTMLDivElement>(null);
  const filter = useFilter({ sensitivity: 'base' });
  const { pinned, all, options } = useMemo(
    () => getCountryOptions(locale, pinnedCountries, countries),
    [locale, pinnedCountries, countries]
  );
  const includes = (value: string) => !query.trim() || filter.contains(value, query.trim());
  const pinnedItems = pinned.filter(
    (item) => includes(item.name) || item.calling.includes(query.trim().replace(/^\+/, ''))
  );
  const allItems = all.filter(
    (item) => includes(item.name) || item.calling.includes(query.trim().replace(/^\+/, ''))
  );
  const selected = options.find((option) => option.code === country);
  const groups = pinned.length
    ? [
        { label: pinnedGroupLabel, items: pinnedItems },
        { label: allGroupLabel, items: allItems },
      ].filter((group) => group.items.length > 0)
    : [{ label: allGroupLabel, items: allItems }].filter((group) => group.items.length > 0);

  return (
    <Combobox
      data-slot="phone-country-combobox"
      aria-label={countryLabel}
      items={groups}
      selectedKey={country}
      onSelectionChange={(key) => {
        if (typeof key === 'string') onCountryChange(key as CountryCode);
        setQuery('');
      }}
      inputValue={query}
      onInputChange={setQuery}
      onOpenChange={(open) => {
        if (!open) setQuery('');
      }}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      allowsEmptyCollection
      defaultFilter={() => true}
      className="relative"
    >
      <div ref={triggerRef} className="w-fit">
        <ComboboxTrigger
          slot="trigger"
          aria-label={countryLabel}
          className={buttonVariants({ variant: 'outline', className: 'w-fit whitespace-nowrap' })}
        >
          {selected && (
            <CountryFlag country={country} className="h-3.5 w-5 rounded-xs object-cover" />
          )}
          <span>+{getCountryCallingCode(country)}</span>
        </ComboboxTrigger>
      </div>
      <ComboboxContent anchor={triggerRef} className="!max-h-72 w-72" placement="bottom start">
        <ComboboxInput
          aria-label={searchPlaceholder}
          placeholder={searchPlaceholder}
          showTrigger={false}
          className="m-1 mb-0 h-8 border-input/30 bg-input/30 shadow-none"
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key !== 'Enter') return;
            const matches = groups.flatMap((group) => group.items);
            if (matches.length !== 1) return;
            event.preventDefault();
            onCountryChange(matches[0].code);
            setQuery('');
          }}
        />
        {groups.length === 0 ? (
          <div
            data-slot="combobox-empty"
            role="status"
            className="px-2 py-6 text-center text-sm text-muted-foreground"
          >
            {emptyMessage}
          </div>
        ) : (
          <ComboboxList items={groups} className="max-h-72">
            {(group) => {
              const index = groups.indexOf(group);
              return (
                <ComboboxGroup key={group.label} items={group.items}>
                  {index > 0 && <ComboboxSeparator />}
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  {group.items.map((option: CountryOption) => (
                    <ComboboxItem
                      key={option.code}
                      id={option.code}
                      textValue={`${option.name} +${option.calling}`}
                    >
                      <CountryFlag
                        country={option.code}
                        className="h-3.5 w-5 rounded-xs object-cover"
                      />
                      <span className="flex-1 truncate">{option.name}</span>
                      <span className="text-muted-foreground">+{option.calling}</span>
                    </ComboboxItem>
                  ))}
                </ComboboxGroup>
              );
            }}
          </ComboboxList>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
