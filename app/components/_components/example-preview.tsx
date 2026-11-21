'use client';

import { Suspense, type ReactNode, useSyncExternalStore } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ExamplePreview({ preview }: { preview: ReactNode }) {
  const isHydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <div data-preview-hydrated={isHydrated}>
      <Suspense fallback={<Skeleton aria-busy="true" className="h-20 w-full" />}>
        {preview}
      </Suspense>
    </div>
  );
}
