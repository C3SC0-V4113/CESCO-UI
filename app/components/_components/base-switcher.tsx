'use client';

import { useState, type ReactNode } from 'react';

import { ComponentBaseProvider } from '@/app/components/_components/base-context';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import type { ComponentBase } from './types';

const bases: { value: ComponentBase; label: string }[] = [
  { value: 'base', label: 'Base UI' },
  { value: 'radix', label: 'Radix' },
  { value: 'aria', label: 'React Aria' },
];

function isComponentBase(value: string | null): value is ComponentBase {
  return bases.some((base) => base.value === value);
}

export function BaseSwitcher({
  primaryExample,
  additionalExamples,
  installation,
  usage,
  api,
}: {
  primaryExample: ReactNode;
  additionalExamples: ReactNode;
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
            <Field orientation="horizontal" className="w-fit">
              <FieldLabel htmlFor="component-base">Base</FieldLabel>
              <Select
                value={base}
                onValueChange={(value) => {
                  if (isComponentBase(value)) setBase(value);
                }}
              >
                <SelectTrigger id="component-base" aria-label="Select component base">
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
            </Field>
          </div>
          {primaryExample}
        </div>
        {installation}
        {usage}
        {additionalExamples}
        {api}
      </div>
    </ComponentBaseProvider>
  );
}
