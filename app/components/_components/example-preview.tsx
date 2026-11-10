'use client';

import { Suspense, type ReactNode } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

export function ExamplePreview({ preview }: { preview: ReactNode }) {
  return (
    <Suspense fallback={<Skeleton aria-busy="true" className="h-20 w-full" />}>{preview}</Suspense>
  );
}
