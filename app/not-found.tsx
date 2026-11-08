import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from '@/components/ui/empty';

export default function NotFound() {
  return (
    <Empty className="mx-auto max-w-4xl">
      <EmptyHeader>
        <p className="text-sm text-muted-foreground">404</p>
        <EmptyTitle role="heading" aria-level={1}>
          Component not found
        </EmptyTitle>
        <EmptyDescription>The component you are looking for does not exist.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="link" render={<Link href="/" />}>
          Browse components
        </Button>
      </EmptyContent>
    </Empty>
  );
}
