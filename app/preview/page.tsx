import { FavoriteToggle } from '@/registry/bases/base/favorite-toggle/favorite-toggle';
import { StatCard } from '@/registry/shared/stat-card/stat-card';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preview | Cesco UI',
  description: 'Preview of the Cesco UI registry components.',
};

export default function PreviewPage() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Preview</h1>
      <section className="grid gap-4 sm:grid-cols-2">
        <StatCard title="Revenue" value="$12,400" change={8.5} description="vs last month" />
        <StatCard title="Churn" value="3%" change={-1.2} description="vs last month" />
      </section>
      <section className="flex items-center gap-2">
        <FavoriteToggle />
      </section>
    </main>
  );
}
