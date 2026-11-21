import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberWithError,
  type CountryCode,
} from 'libphonenumber-js';

export type CountryOption = { code: CountryCode; name: string; calling: string };

export function getCountryOptions(
  locale = 'en',
  pinnedCountries: CountryCode[] = [],
  countries: CountryCode[] = getCountries()
) {
  const names = new Intl.DisplayNames([locale], { type: 'region' });
  const toOption = (code: CountryCode): CountryOption => ({
    code,
    name: names.of(code) ?? code,
    calling: getCountryCallingCode(code),
  });
  const allowed = new Set(countries);
  const pinned = pinnedCountries
    .filter((code) => allowed.has(code))
    .filter((code, index) => pinnedCountries.indexOf(code) === index)
    .map(toOption);
  const pinnedSet = new Set(pinnedCountries);
  const all = countries
    .filter((code) => !pinnedSet.has(code))
    .map(toOption)
    .sort((a, b) => a.name.localeCompare(b.name, locale));
  return { pinned, all, options: [...pinned, ...all] };
}

export function toE164(country: CountryCode, national: string) {
  const digits = national.replace(/\D/g, '');
  if (!digits) return '';
  const formatter = new AsYouType(country);
  formatter.input(digits);
  return formatter.getNumber()?.number ?? `+${getCountryCallingCode(country)}${digits}`;
}

export function formatNational(country: CountryCode, national: string) {
  return new AsYouType(country).input(national);
}

export function formatInternational(value: string) {
  return new AsYouType().input(value);
}

export function toE164International(value: string) {
  const formatter = new AsYouType();
  formatter.input(value);
  return formatter.getNumber()?.number ?? `+${value.replace(/\D/g, '')}`;
}

export function deriveFromValueWithFixedCountry(value: string | undefined, country: CountryCode) {
  if (!value) return { country, national: '' };
  const trimmed = value.trim();
  if (!trimmed.startsWith('+')) {
    return { country, national: formatNational(country, trimmed) };
  }

  const digits = trimmed.replace(/\D/g, '');
  const callingCode = getCountries()
    .map((candidate) => ({ calling: getCountryCallingCode(candidate) }))
    .filter(({ calling }) => digits.startsWith(calling))
    .sort((a, b) => b.calling.length - a.calling.length)[0];

  if (callingCode?.calling === getCountryCallingCode(country)) {
    return {
      country,
      national: formatNational(country, digits.slice(callingCode.calling.length)),
    };
  }

  return { country, national: formatInternational(trimmed) };
}

export function deriveFromValue(value: string | undefined, fallbackCountry: CountryCode) {
  if (!value) return { country: fallbackCountry, national: '' };
  const trimmed = value.trim();
  if (!trimmed.startsWith('+')) {
    return { country: fallbackCountry, national: formatNational(fallbackCountry, trimmed) };
  }
  const digits = trimmed.replace(/\D/g, '');
  if (!digits) return { country: fallbackCountry, national: '' };

  try {
    const parsed = parsePhoneNumberWithError(trimmed);
    if (parsed.country)
      return {
        country: parsed.country,
        national: formatNational(parsed.country, parsed.nationalNumber),
      };
  } catch {
    /* Incomplete international numbers are resolved from their calling code below. */
  }

  const callingCode = getCountries()
    .map((country) => ({ country, calling: getCountryCallingCode(country) }))
    .filter(({ calling }) => digits.startsWith(calling))
    .sort((a, b) => b.calling.length - a.calling.length)[0];
  if (!callingCode) return { country: fallbackCountry, national: digits };
  const country =
    getCountryCallingCode(fallbackCountry) === callingCode.calling
      ? fallbackCountry
      : callingCode.country;
  return {
    country,
    national: formatNational(country, digits.slice(callingCode.calling.length)),
  };
}
