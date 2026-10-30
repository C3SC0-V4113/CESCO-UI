'use client';

import { Button } from '@/registry/bases/radix/ui/button';
import * as Combobox from '@/registry/bases/radix/ui/combobox';
import {
  CountryPicker as SharedCountryPicker,
  type CountryPickerProps,
} from '@/registry/shared/components/country-picker-base';

export function CountryPicker(props: CountryPickerProps) {
  return <SharedCountryPicker {...props} api={Combobox} TriggerButton={Button} />;
}
