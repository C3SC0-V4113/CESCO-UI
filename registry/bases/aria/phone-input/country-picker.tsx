'use client';

import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import { useMemo, useRef, useState } from 'react';
import {
  Autocomplete,
  Header,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Popover,
  SearchField,
  Select,
  useFilter,
} from 'react-aria-components';

import { Button } from '@/registry/bases/aria/ui/button';
import { Input } from '@/registry/bases/aria/ui/input';
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
  const triggerRef = useRef<HTMLDivElement>(null);
  const filter = useFilter({ sensitivity: 'base' });
  const { pinned, all } = useMemo(
    () => getCountryOptions(locale, pinnedCountries, countries),
    [locale, pinnedCountries, countries]
  );
  const groups = useMemo(() => {
    return pinned.length
      ? [
          { label: pinnedGroupLabel, items: pinned },
          { label: allGroupLabel, items: all },
        ]
      : [{ label: allGroupLabel, items: all }];
  }, [all, allGroupLabel, pinned, pinnedGroupLabel]);
  const matchesText = (textValue: string, value = query) => {
    const normalizedQuery = value.trim();
    return (
      !normalizedQuery ||
      filter.contains(textValue, normalizedQuery) ||
      textValue.includes(normalizedQuery.replace(/^\+/, ''))
    );
  };

  return (
    <Select
      data-slot="phone-country-select"
      aria-label={countryLabel}
      selectedKey={country}
      onSelectionChange={(key) => {
        if (typeof key === 'string') onCountryChange(key as CountryCode);
        setQuery('');
      }}
      onOpenChange={(open) => {
        if (!open) setQuery('');
      }}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      className="relative w-fit"
    >
      <div ref={triggerRef} className="w-fit">
        <Button
          data-slot="phone-country-select-trigger"
          variant="outline"
          className="w-fit whitespace-nowrap"
        >
          <CountryFlag country={country} className="h-3.5 w-5 rounded-xs object-cover" />
          <span>+{getCountryCallingCode(country)}</span>
        </Button>
      </div>
      <Popover
        triggerRef={triggerRef}
        className="max-h-72 w-72 overflow-y-auto rounded-lg border bg-popover p-1 text-popover-foreground shadow-md outline-none"
      >
        <Autocomplete filter={(textValue) => matchesText(textValue)}>
          <SearchField
            aria-label={searchPlaceholder}
            autoFocus
            value={query}
            onChange={setQuery}
            className="m-1 mb-0"
          >
            <Input
              placeholder={searchPlaceholder}
              className="h-8 border-input/30 bg-input/30 shadow-none"
              onKeyDown={(event) => {
                if (event.key !== 'Enter') return;
                const matches = groups
                  .flatMap((group) => group.items)
                  .filter((option) => matchesText(`${option.name} +${option.calling}`));
                if (matches.length !== 1) return;
                event.preventDefault();
                onCountryChange(matches[0].code);
                setQuery('');
              }}
            />
          </SearchField>
          <ListBox
            aria-label={countryLabel}
            className="max-h-72 overflow-y-auto outline-none"
            renderEmptyState={() => (
              <div
                data-slot="phone-country-empty"
                role="status"
                className="px-2 py-6 text-center text-sm text-muted-foreground"
              >
                {emptyMessage}
              </div>
            )}
          >
            {groups.map((group, index) => (
              <ListBoxSection key={group.label} id={group.label}>
                <Header
                  className={`px-2 py-1.5 text-xs font-medium text-muted-foreground ${index > 0 ? 'pt-2' : ''}`}
                >
                  {index > 0 &&
                    pinned.some((option) => matchesText(`${option.name} +${option.calling}`)) && (
                      <hr className="-mx-1 mb-2 block h-px border-0 bg-border" />
                    )}
                  {group.label}
                </Header>
                {group.items.map((option) => (
                  <ListBoxItem
                    key={option.code}
                    id={option.code}
                    textValue={`${option.name} +${option.calling}`}
                    className="relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors outline-none focus:bg-accent focus:text-accent-foreground data-[selected]:bg-accent data-[selected]:text-accent-foreground"
                  >
                    <CountryFlag
                      country={option.code}
                      className="h-3.5 w-5 rounded-xs object-cover"
                    />
                    <span className="flex-1 truncate">{option.name}</span>
                    <span className="text-muted-foreground">+{option.calling}</span>
                  </ListBoxItem>
                ))}
              </ListBoxSection>
            ))}
          </ListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}
