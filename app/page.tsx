import Link from 'next/link';

import { components } from '@/app/registry';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-sm text-muted-foreground">Cesco UI</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Component registry</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Components designed to work across Base UI, Radix, and React Aria.
      </p>
      {components.length ? (
        <ul className="mt-8 divide-y rounded-lg border">
          {components.map(({ name, title, description }) => (
            <li key={name}>
              <Link className="block p-5 hover:bg-accent" href={`/components/${name}`}>
                <h2 className="font-medium">{title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <section aria-labelledby="empty-title" className="mt-8 rounded-lg border bg-card p-6">
          <h2 id="empty-title" className="font-medium">
            No components yet
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Registry components will appear here when they are added.
          </p>
        </section>
      )}
    </div>
  );
}
