import { notFound } from 'next/navigation';

import { componentDocs, isComponentName } from '@/app/components/_docs';
import { generateComponentParams, isComponentBase } from '@/app/components/_docs/routes';
import { components } from '@/app/registry';

import type { Metadata } from 'next';

export const ensureStatic = 'navigation';
export const instant = false;

export function generateStaticParams() {
  return generateComponentParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ base: string; name: string }>;
}): Promise<Metadata> {
  const { base, name } = await params;
  if (!isComponentBase(base) || !isComponentName(name)) notFound();

  const component = components.find((item) => item.name === name);
  if (!component) notFound();

  return { title: `${component.title} | Cesco UI`, description: component.description };
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ base: string; name: string }>;
}) {
  const { base, name } = await params;
  if (!isComponentBase(base) || !isComponentName(name)) notFound();

  const component = components.find((item) => item.name === name);
  if (!component) notFound();

  const DocsPage = await componentDocs[name]();
  return <DocsPage base={base} />;
}
