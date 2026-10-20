import Link from 'next/link';

import { components } from '@/app/registry';

export function SiteSidebar() {
  return (
    <aside className="w-full border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:min-h-dvh md:w-64 md:shrink-0 md:border-r md:border-b-0">
      <div className="border-b border-sidebar-border px-5 py-5">
        <Link className="font-semibold tracking-tight" href="/">
          Cesco UI
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">Component registry</p>
      </div>
      <nav aria-label="Registry components" className="p-3">
        <p className="px-2 py-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Components
        </p>
        {components.length ? (
          <ul className="space-y-1">
            {components.map((component) => (
              <li key={component.name}>
                <Link
                  className="block rounded-md px-2 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  href={`/components/${component.name}`}
                >
                  {component.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-2 py-2 text-sm text-muted-foreground">No components yet.</p>
        )}
      </nav>
    </aside>
  );
}
