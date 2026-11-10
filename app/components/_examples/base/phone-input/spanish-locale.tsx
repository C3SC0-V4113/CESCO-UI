'use client';

import { Field, FieldLabel } from '@/components/ui/field';
import { PhoneInput } from '@/registry/bases/base/phone-input/phone-input';

export default function SpanishLocaleExample() {
  return (
    <Field className="max-w-sm">
      <FieldLabel htmlFor="phone-spanish">Número de teléfono</FieldLabel>
      <PhoneInput
        id="phone-spanish"
        locale="es"
        countryLabel="País"
        searchPlaceholder="Buscar país"
        emptyMessage="Sin resultados"
        pinnedGroupLabel="Sugeridos"
        allGroupLabel="Todos los países"
      />
    </Field>
  );
}
