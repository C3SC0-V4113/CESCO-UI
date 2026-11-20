'use client';

import { getCountryCallingCode, type CountryCode } from 'libphonenumber-js';
import {
  Fragment,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
} from 'react';
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
  const listContainerRef = useRef<HTMLDivElement>(null);
  const filter = useFilter({ sensitivity: 'base' });
  const { pinned, all } = useMemo(
    () =>
      isOpen
        ? getCountryOptions(locale, pinnedCountries, countries)
        : {
            pinned: [],
            all: [{ code: country, name: country, calling: getCountryCallingCode(country) }],
          },
    [countries, country, isOpen, locale, pinnedCountries]
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
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((option) => matchesText(`${option.name} +${option.calling}`)),
    }))
    .filter((group) => group.items.length > 0);
  useLayoutEffect(() => {
    if (!isOpen) return;
    const selectedOption = listContainerRef.current?.querySelector<HTMLElement>(
      '[data-selected-country="true"]'
    );
    selectedOption?.scrollIntoView?.({ block: 'nearest' });
  }, [country, isOpen]);

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
      <SelectTrigger data-slot="phone-country-trigger" aria-label={countryLabel}>
        <CountryFlag country={country} className="h-3.5 w-5 rounded-xs object-cover" />
        <span>+{getCountryCallingCode(country)}</span>
      </SelectTrigger>
      <SelectPopover className="max-h-72 w-72 max-w-(--available-width)">
        <Autocomplete filter={(textValue) => matchesText(textValue)}>
          <SelectInput {...searchInputProps} />
          <div
            ref={listContainerRef}
            data-slot="phone-country-list-container"
            className="flex max-h-(--available-height) flex-col"
          >
            <SelectList
              aria-label={countryLabel}
              className="no-scrollbar max-h-63 min-h-0 flex-1 scroll-py-1 overscroll-contain p-1 data-empty:p-0"
            >
              {visibleGroups.map((group, index) => (
                <Fragment key={group.label}>
                  {index > 0 &&
                    visibleGroups.some(
                      (visibleGroup) => visibleGroup.label === pinnedGroupLabel
                    ) && <SelectSeparator />}
                  <SelectGroup id={group.label}>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.items.map((option) => (
                      <SelectItem
                        key={option.code}
                        id={option.code}
                        textValue={`${option.name} +${option.calling}`}
                        data-selected-country={option.code === country ? 'true' : undefined}
                      >
                        <CountryFlag
                          country={option.code}
                          className="h-3.5 w-5 rounded-xs object-cover"
                        />
                        <span className="flex-1 truncate">{option.name}</span>
                        <span className="text-muted-foreground">+{option.calling}</span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </Fragment>
              ))}
            </SelectList>
            {visibleGroups.length === 0 && (
              <SelectEmpty data-slot="phone-country-empty" role="status" className="flex">
                {emptyMessage}
              </SelectEmpty>
            )}
          </div>
        </Autocomplete>
      </SelectPopover>
    </Select>
  );
}
