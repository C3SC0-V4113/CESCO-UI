'use client';

import { useState, type ReactNode } from 'react';

import { ComponentBaseProvider } from '@/app/components/_components/base-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { ExampleCard, ExamplesViewer } from './examples-viewer';

import type { ComponentBase } from './types';
import type { ComponentExample } from '../_docs/types';

const bases: { value: ComponentBase; label: string }[] = [
  { value: 'base', label: 'Base UI' },
  { value: 'radix', label: 'Radix' },
  { value: 'aria', label: 'React Aria' },
];

function isComponentBase(value: string | null): value is ComponentBase {
  return bases.some((base) => base.value === value);
}

export function BaseSwitcher({
  examples,
  installation,
  usage,
  api,
}: {
  examples: ComponentExample[];
  installation: ReactNode;
  usage: ReactNode;
  api: ReactNode;
}) {
  const [base, setBase] = useState<ComponentBase>('base');

  return (
    <ComponentBaseProvider value={base}>
      <div className="mt-8 min-w-0 space-y-10">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="preview-heading" className="text-xl font-semibold tracking-tight">
              Preview
            </h2>
            <label className="flex items-center gap-2 text-sm">
              <span>Base</span>
              <Select
                value={base}
                onValueChange={(value) => {
                  if (isComponentBase(value)) setBase(value);
                }}
              >
                <SelectTrigger aria-label="Select component base">
                  <SelectValue>{bases.find((item) => item.value === base)?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {bases.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </label>
          </div>
          {examples[0] && <ExampleCard example={examples[0]} />}
        </div>
        {installation}
        {usage}
        {examples.length > 1 && (
          <section aria-labelledby="examples-heading" className="min-w-0 space-y-4">
            <h2 id="examples-heading" className="text-xl font-semibold tracking-tight">
              Examples
            </h2>
            <ExamplesViewer examples={examples.slice(1)} />
          </section>
        )}
        {api}
      </div>
    </ComponentBaseProvider>
  );
}
