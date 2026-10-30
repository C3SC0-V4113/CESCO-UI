import { lazy, Suspense, type ComponentType, type LazyExoticComponent, type SVGProps } from 'react';

import { countryFlagLoaders } from '../lib/country-flag-loaders';

import type { CountryCode } from 'libphonenumber-js';

const flagByCountry = Object.fromEntries(
  Object.entries(countryFlagLoaders).map(([country, loader]) => [country, lazy(loader)])
) as Record<CountryCode, LazyExoticComponent<ComponentType<SVGProps<SVGSVGElement>>>>;

export function CountryFlag({ country, className }: { country: CountryCode; className?: string }) {
  const Flag = flagByCountry[country];
  return (
    <Suspense fallback={<span aria-hidden className={className} />}>
      <Flag aria-hidden data-testid="country-flag" className={className} />
    </Suspense>
  );
}
