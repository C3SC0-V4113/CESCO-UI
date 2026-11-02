import { cn } from 'cn';
import { Suspense, use, type CSSProperties } from 'react';

import { countryFlagLoaders } from '../lib/country-flag-loaders';

import type { CountryCode } from 'libphonenumber-js';

const countryFlagCache = new Map<CountryCode, Promise<string>>();
const flagClassName = 'inline-block bg-cover bg-center bg-(image:--country-flag-image)';

function loadFlag(country: CountryCode): Promise<string> {
  let promise = countryFlagCache.get(country);
  if (!promise) {
    promise = countryFlagLoaders[country]()
      .then((module) => module.default)
      .catch(() => {
        countryFlagCache.delete(country);
        return '';
      });
    countryFlagCache.set(country, promise);
  }
  return promise;
}

function Flag({ country, className }: { country: CountryCode; className?: string }) {
  const svg = use(loadFlag(country));
  return (
    <span
      aria-hidden
      data-slot="country-flag"
      className={cn(flagClassName, className)}
      style={
        {
          '--country-flag-image': `url("data:image/svg+xml,${encodeURIComponent(svg)}")`,
        } as CSSProperties
      }
    />
  );
}

export function CountryFlag({ country, className }: { country: CountryCode; className?: string }) {
  return (
    <Suspense fallback={<span aria-hidden className={cn(flagClassName, className)} />}>
      <Flag country={country} className={className} />
    </Suspense>
  );
}
