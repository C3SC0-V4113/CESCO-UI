import { fireEvent, render, screen } from '@testing-library/react';
import { getCountries } from 'libphonenumber-js';
import { describe, expect, it, vi } from 'vitest';

import { PhoneInput as Aria } from '@/registry/bases/aria/phone-input/phone-input';
import { PhoneInput as Base } from '@/registry/bases/base/phone-input/phone-input';
import { PhoneInput as Radix } from '@/registry/bases/radix/phone-input/phone-input';
import { countryFlagLoaders } from '@/registry/shared/lib/country-flag-loaders';
import { deriveFromValue, getCountryOptions, toE164 } from '@/registry/shared/lib/phone';

describe('phone helpers', () => {
  it('converts national digits to E.164 and leaves incomplete values empty', () => {
    expect(toE164('SV', '74920123')).toBe('+50374920123');
    expect(toE164('SV', '')).toBe('');
    expect(toE164('GB', '0')).toBe('+440');
    expect(toE164('US', '1')).toBe('+11');
  });
  it('hydrates a country and formatted national value from E.164', () => {
    expect(deriveFromValue('+50374920123', 'US')).toEqual({ country: 'SV', national: '7492 0123' });
  });
  it('uses locale names, pinned ordering and locale alphabetical order', () => {
    const { pinned, all, options } = getCountryOptions('en', ['US', 'CA']);
    expect(pinned.map((item) => item.code)).toEqual(['US', 'CA']);
    expect(options.slice(0, 2)).toEqual(pinned);
    expect(all.map((item) => item.name)).toEqual(
      [...all].map((item) => item.name).sort((a, b) => a.localeCompare(b, 'en'))
    );
    expect(options).toHaveLength(new Set(options.map((item) => item.code)).size);
  });
  it('keeps partial international digits and provides a loader for every country', () => {
    expect(deriveFromValue('+1555', 'US').national.replace(/\D/g, '')).toBe('555');
    expect(deriveFromValue('+15558675309', 'US').national.replace(/\D/g, '')).toBe('5558675309');
    expect(deriveFromValue('+44791', 'US').national.replace(/\D/g, '')).toBe('791');
    expect(deriveFromValue('+44791', 'US').country).toBe('GB');
    expect(Object.keys(countryFlagLoaders).sort()).toEqual([...getCountries()].sort());
  });
});

describe.each([
  ['base', Base],
  ['radix', Radix],
  ['aria', Aria],
] as const)('PhoneInput (%s)', (_base, PhoneInput) => {
  function openCountryPicker() {
    fireEvent.click(
      _base === 'aria'
        ? screen.getByRole('button', { name: 'Country selector' })
        : screen.getByRole('combobox', { name: 'Country selector' })
    );
  }

  it('formats typed national numbers and emits E.164', () => {
    const onChange = vi.fn();
    render(<PhoneInput value="" onChange={onChange} defaultCountry="SV" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '74920123' } });
    expect(onChange).toHaveBeenLastCalledWith('+50374920123');
  });
  it.each(['+44 7911 123456', '+447911123456'])(
    'adopts a foreign calling code from %s',
    (value) => {
      const onChange = vi.fn();
      render(<PhoneInput value="" onChange={onChange} defaultCountry="US" />);
      fireEvent.change(screen.getByRole('textbox'), { target: { value } });
      expect(screen.getByText(/\+44/)).toBeTruthy();
      expect(onChange).toHaveBeenLastCalledWith('+447911123456');
    }
  );
  it('hydrates an initial E.164 value and removes pasted calling code', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PhoneInput value="+50374920123" onChange={onChange} />);
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('7492 0123');
    expect(screen.getByText('+503')).toBeTruthy();
    rerender(<PhoneInput value="" onChange={onChange} defaultCountry="SV" />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '+50374920123' } });
    expect((screen.getByRole('textbox') as HTMLInputElement).value).toBe('7492 0123');
    expect(onChange).toHaveBeenLastCalledWith('+50374920123');
  });
  it('syncs external value changes, including clearing the field', () => {
    const { rerender } = render(<PhoneInput value="+50374920123" onChange={vi.fn()} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value).toBe('7492 0123');
    expect(screen.getByText('+503')).toBeTruthy();

    rerender(<PhoneInput value="+15025551234" onChange={vi.fn()} />);
    expect(input.value).toBe('(502) 555-1234');
    expect(screen.getByText('+1')).toBeTruthy();

    rerender(<PhoneInput value="" onChange={vi.fn()} defaultCountry="SV" />);
    expect(input.value).toBe('');
    expect(screen.getByText('+503')).toBeTruthy();
  });
  it('keeps partial values and does not erase a field for a stale partial update', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PhoneInput value="+1555" onChange={onChange} />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input.value.replace(/\D/g, '')).toBe('555');
    rerender(<PhoneInput value="+44791" onChange={onChange} />);
    expect(input.value.replace(/\D/g, '')).toBe('791');
    expect(screen.getByText('+44')).toBeTruthy();
    rerender(<PhoneInput value="+4479" onChange={onChange} />);
    expect(input.value.replace(/\D/g, '')).toBe('79');
  });
  it('clears a GB field when its controlled value resets to empty after incomplete input', () => {
    const onChange = vi.fn();
    const { rerender } = render(<PhoneInput value="" onChange={onChange} defaultCountry="GB" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '0' } });
    expect(onChange).toHaveBeenLastCalledWith('+440');
    rerender(<PhoneInput value="+440" onChange={onChange} defaultCountry="GB" />);
    rerender(<PhoneInput value="" onChange={onChange} defaultCountry="GB" />);
    expect(input.value).toBe('');
  });
  it('works uncontrolled when onChange is omitted', () => {
    render(<PhoneInput defaultCountry="SV" />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '74920123' } });
    expect(input.value).toBe('7492 0123');
  });
  it('restricts picker countries, intersects pinned countries, and retains an excluded selection', () => {
    render(
      <PhoneInput
        value="+447911123456"
        onChange={vi.fn()}
        countries={['SV', 'US']}
        pinnedCountries={['US', 'CA']}
        countryLabel="Country selector"
      />
    );
    expect(screen.getByText('+44')).toBeTruthy();
    openCountryPicker();
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.getByText('United States')).toBeTruthy();
    expect(screen.getByText('El Salvador')).toBeTruthy();
    expect(screen.queryByText('Canada')).toBeNull();
  });
  it('selects the filtered country with ArrowDown and Enter', () => {
    render(
      <PhoneInput
        value=""
        onChange={vi.fn()}
        defaultCountry="SV"
        countries={['SV', 'US']}
        countryLabel="Country selector"
      />
    );
    openCountryPicker();
    const search = screen.getByPlaceholderText('Search country');
    fireEvent.change(search, { target: { value: 'United States' } });
    fireEvent.keyDown(search, { key: 'ArrowDown' });
    fireEvent.keyDown(search, { key: 'Enter' });
    fireEvent.keyDown(search, { key: 'Escape' });
    expect(
      screen.getByRole(_base === 'aria' ? 'button' : 'combobox', { name: 'Country selector' })
        .textContent
    ).toContain('+1');
  });
  it('loads the selected flag on demand', async () => {
    render(<PhoneInput value="" onChange={vi.fn()} defaultCountry="SV" />);
    expect(await screen.findByTestId('country-flag')).toBeTruthy();
  });
  it('defaults to the US and exposes an overridable country label', () => {
    const { rerender } = render(<PhoneInput value="" onChange={vi.fn()} />);
    expect(
      screen.getByRole(_base === 'aria' ? 'button' : 'combobox', { name: 'Country' })
    ).toBeTruthy();
    rerender(<PhoneInput value="" onChange={vi.fn()} countryLabel="Contact country" />);
    expect(
      screen.getByRole(_base === 'aria' ? 'button' : 'combobox', { name: 'Contact country' })
    ).toBeTruthy();
    expect(screen.getByText('+1')).toBeTruthy();
  });
  it('does not mark the country trigger invalid when aria-invalid is false', () => {
    render(<PhoneInput value="" onChange={vi.fn()} aria-invalid="false" />);
    const trigger = screen.getByRole(_base === 'aria' ? 'button' : 'combobox', { name: 'Country' });
    expect(trigger.getAttribute('aria-invalid')).not.toBe('true');
  });
  it('supports translated labels, searchable pinned groups, and hides empty groups', () => {
    render(
      <PhoneInput
        value=""
        onChange={vi.fn()}
        countryLabel="Country selector"
        pinnedCountries={['US', 'CA']}
      />
    );
    openCountryPicker();
    expect(screen.getByText('Suggested')).toBeTruthy();
    expect(screen.getByText('All countries')).toBeTruthy();
    fireEvent.change(screen.getByPlaceholderText('Search country'), {
      target: { value: 'canada' },
    });
    expect((screen.getByPlaceholderText('Search country') as HTMLInputElement).value).toBe(
      'canada'
    );
    expect(screen.queryByText('All countries')).toBeNull();
    expect(screen.getAllByRole('option')).toHaveLength(1);
    expect(screen.queryByText('All countries')).toBeNull();
    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });
  it('searches the all-countries group, shows the empty state, and restores both groups', () => {
    render(
      <PhoneInput
        value=""
        onChange={vi.fn()}
        pinnedCountries={['US', 'CA']}
        countryLabel="Country selector"
      />
    );
    openCountryPicker();
    expect(
      screen
        .getAllByRole('option')
        .slice(0, 3)
        .map((option) => option.textContent?.replace(/\s+/g, ''))
    ).toEqual(['UnitedStates+1', 'Canada+1', 'Afghanistan+93']);
    const search = screen.getByPlaceholderText('Search country');
    fireEvent.change(search, { target: { value: 'Argent' } });
    expect(
      screen.getAllByRole('option').map((option) => option.textContent?.replace(/\s+/g, ''))
    ).toEqual(['Argentina+54']);
    expect(screen.queryByText('Suggested')).toBeNull();
    expect(screen.getByText('All countries')).toBeTruthy();
    expect(screen.queryAllByRole('separator')).toHaveLength(0);
    fireEvent.change(search, { target: { value: 'zzzzzz' } });
    expect(screen.queryAllByRole('option')).toHaveLength(0);
    expect(screen.getByText('No results')).toBeTruthy();
    fireEvent.change(search, { target: { value: '' } });
    expect(screen.getByText('Suggested')).toBeTruthy();
    expect(screen.getByText('All countries')).toBeTruthy();
    expect(screen.getAllByRole('separator')).toHaveLength(1);
  });
  it('uses a single unseparated group when no countries are pinned', () => {
    render(<PhoneInput value="" onChange={vi.fn()} countryLabel="Country selector" />);
    openCountryPicker();
    expect(screen.getByText('All countries')).toBeTruthy();
    expect(screen.queryByText('Suggested')).toBeNull();
    expect(screen.queryAllByRole('separator')).toHaveLength(0);
  });
  it('does not restore formatting characters when deleting', () => {
    render(<PhoneInput value="+15025551234" onChange={vi.fn()} />);
    const input = screen.getByRole('textbox');
    expect((input as HTMLInputElement).value).toBe('(502) 555-1234');
    fireEvent.change(input, { target: { value: '(502' } });
    expect((input as HTMLInputElement).value).toBe('(502');
  });
});
