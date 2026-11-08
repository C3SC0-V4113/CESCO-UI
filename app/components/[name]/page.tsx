import { notFound } from 'next/navigation';

import { BaseSwitcher } from '@/app/components/_components/base-switcher';
import {
  ApiReference,
  InstallationSection,
  UsageSection,
} from '@/app/components/_components/docs-sections';
import { componentDocs, isComponentName } from '@/app/components/_docs';
import { components } from '@/app/registry';

import type { Metadata } from 'next';

export const ensureStatic = 'navigation';
export const instant = false;

export function generateStaticParams() {
  return components.map(({ name }) => ({ name }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ name: string }>;
}): Promise<Metadata> {
  const { name } = await params;
  const component = components.find((item) => item.name === name);

  if (!component) notFound();

  return { title: `${component.title} | Cesco UI`, description: component.description };
}

export default async function ComponentPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const component = components.find((item) => item.name === name);

  if (!component) notFound();

  if (!isComponentName(name)) notFound();
  const docs = await componentDocs[name]();

  return (
    <article className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">Component</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{component.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{component.description}</p>
      <BaseSwitcher
        examples={docs.examples}
        installation={<InstallationSection name={component.name} />}
        usage={<UsageSection usage={docs.usage} />}
        api={<ApiReference props={docs.api} />}
      />
    </article>
  );
}
