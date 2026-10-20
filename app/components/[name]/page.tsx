import { notFound } from 'next/navigation';

import { BaseSwitcher } from '@/app/components/_components/base-switcher';
import { components } from '@/app/registry';

import type { DemoProps } from '@/app/components/_demos/types';
import type { Metadata } from 'next';
import type { ComponentType } from 'react';

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

  let Demo: ComponentType<DemoProps>;
  try {
    const demoModule = await import(`../_demos/${name}`);
    Demo = demoModule.default;
  } catch {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">Component</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{component.title}</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">{component.description}</p>
      <BaseSwitcher
        demos={{
          base: <Demo base="base" />,
          radix: <Demo base="radix" />,
          aria: <Demo base="aria" />,
        }}
      />
    </article>
  );
}
