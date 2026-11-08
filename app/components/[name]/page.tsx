import { notFound } from 'next/navigation';

import { BaseSwitcher } from '@/app/components/_components/base-switcher';
import {
  ApiReference,
  InstallationSection,
  UsageSection,
} from '@/app/components/_components/docs-sections';
import { ExampleCard, ExamplesViewer } from '@/app/components/_components/examples-viewer';
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
        primaryExample={docs.examples[0] ? <ExampleCard example={docs.examples[0]} /> : null}
        additionalExamples={
          docs.examples.length > 1 ? (
            <section aria-labelledby="examples-heading" className="min-w-0 space-y-4">
              <h2 id="examples-heading" className="text-xl font-semibold tracking-tight">
                Examples
              </h2>
              <ExamplesViewer examples={docs.examples.slice(1)} />
            </section>
          ) : null
        }
        installation={<InstallationSection name={component.name} />}
        usage={<UsageSection usage={docs.usage} />}
        api={<ApiReference props={docs.api} />}
      />
    </article>
  );
}
