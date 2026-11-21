import { BaseNavigation } from './base-navigation';
import { OnThisPage } from './on-this-page';

import type { PageSectionLink } from './on-this-page';
import type { ComponentBase } from './types';
import type { ReactNode } from 'react';

export function ComponentDocPage({
  name,
  title,
  description,
  base,
  sections,
  children,
}: {
  name: string;
  title: string;
  description: string;
  base: ComponentBase;
  sections: PageSectionLink[];
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <header className="space-y-3">
        <p className="text-sm text-muted-foreground">Component</p>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
          </div>
          <BaseNavigation name={name} base={base} />
        </div>
      </header>
      <div className="mt-10 grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_12rem]">
        <article className="min-w-0 space-y-12">{children}</article>
        <OnThisPage sections={sections} />
      </div>
    </div>
  );
}
