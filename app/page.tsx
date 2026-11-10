import Link from 'next/link';

import { components } from '@/app/registry';
import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cesco UI | Component Registry',
  description: 'Components designed to work across Base UI, Radix, and React Aria.',
};

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">Cesco UI</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Component registry</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Components designed to work across Base UI, Radix, and React Aria.
      </p>
      {components.length ? (
        <ItemGroup className="mt-8">
          {components.map(({ name, title, description }) => (
            <Item key={name} variant="outline" render={<Link href={`/components/base/${name}`} />}>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription>{description}</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      ) : (
        <Empty className="mt-8">
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={2}>
              No components yet
            </EmptyTitle>
            <EmptyDescription>
              Registry components will appear here when they are added.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" render={<Link href="/" />}>
              Browse components
            </Button>
          </EmptyContent>
        </Empty>
      )}
    </div>
  );
}
