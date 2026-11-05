'use client';

import { PhoneInput } from '@/registry/preview/phone-input';

export default function SpanishLocaleExample() {
  return (
    <div className="grid max-w-sm gap-2">
      <label htmlFor="phone-spanish" className="text-sm font-medium">
        Número de teléfono
      </label>
      <PhoneInput
        id="phone-spanish"
        locale="es"
        countryLabel="País"
        searchPlaceholder="Buscar país"
        emptyMessage="Sin resultados"
        pinnedGroupLabel="Sugeridos"
        allGroupLabel="Todos los países"
      />
    </div>
  );
}
