import Link from 'next/link';

import { componentBases } from '@/app/components/_docs/routes';

import type { ComponentBase } from './types';

const labels: Record<ComponentBase, string> = {
  base: 'Base UI',
  radix: 'Radix',
  aria: 'React Aria',
};

export function BaseNavigation({ name, base }: { name: string; base: ComponentBase }) {
  return (
    <nav aria-label="Component base" className="inline-flex items-center rounded-lg bg-muted p-1">
      {componentBases.map((option) => (
        <Link
          key={option}
          href={`/components/${option}/${name}`}
          aria-current={base === option ? 'page' : undefined}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-background aria-[current=page]:text-foreground aria-[current=page]:shadow-sm"
        >
          {labels[option]}
        </Link>
      ))}
    </nav>
  );
}
