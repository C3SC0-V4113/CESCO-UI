'use client';

import { Suspense, type ReactNode } from 'react';

export function ExamplePreview({ preview }: { preview: ReactNode }) {
  return (
    <Suspense fallback={<div aria-busy="true" className="animate-pulse rounded-md bg-muted" />}>
      {preview}
    </Suspense>
  );
}
