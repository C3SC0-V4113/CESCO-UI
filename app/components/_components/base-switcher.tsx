'use client';

import { useState } from 'react';

import type { ComponentBase } from '@/app/components/_demos/types';
import type { ReactNode } from 'react';

const bases: { value: ComponentBase; label: string }[] = [
  { value: 'base', label: 'Base UI' },
  { value: 'radix', label: 'Radix' },
  { value: 'aria', label: 'React Aria' },
];

export function BaseSwitcher({ demos }: { demos: Record<ComponentBase, ReactNode> }) {
  const [base, setBase] = useState<ComponentBase>('base');

  return (
    <section className="mt-8 space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium">Preview</h2>
        <label className="flex items-center gap-2 text-sm">
          <span>Base</span>
          <select
            aria-label="Select component base"
            className="rounded-md border border-input bg-background px-3 py-2 text-foreground"
            value={base}
            onChange={(event) => setBase(event.target.value as ComponentBase)}
          >
            {bases.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="rounded-lg border bg-card p-6 text-card-foreground">{demos[base]}</div>
    </section>
  );
}
