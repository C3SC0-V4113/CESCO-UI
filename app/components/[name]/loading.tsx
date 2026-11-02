export default function Loading() {
  return (
    <article aria-busy="true" aria-label="Loading component page" className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">Component</p>
      <div aria-hidden className="mt-2 h-9 w-64 animate-pulse rounded bg-muted" />
      <div aria-hidden className="mt-3 h-5 max-w-2xl animate-pulse rounded bg-muted" />

      <section className="mt-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-medium">Preview</h2>
          <div aria-hidden className="h-9 w-28 animate-pulse rounded-md border bg-muted" />
        </div>
        <div className="rounded-lg border bg-card p-6 text-card-foreground">
          <div aria-hidden className="h-4 w-40 animate-pulse rounded bg-muted" />
          <div aria-hidden className="mt-3 flex gap-2">
            <div className="h-8 w-20 animate-pulse rounded-md border bg-muted" />
            <div className="h-8 min-w-0 flex-1 animate-pulse rounded-md border bg-muted" />
          </div>
        </div>
      </section>
    </article>
  );
}
