'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export type PageSectionLink = { id: string; title: string };

export function OnThisPage({ sections }: { sections: PageSectionLink[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: '-12% 0px -72% 0px' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label="On this page" className="sticky top-8 hidden xl:block">
      <p className="mb-3 text-sm font-medium">On this page</p>
      <ul className="space-y-2 border-s ps-3 text-sm">
        {sections.map(({ id, title }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              aria-current={activeId === id ? 'location' : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground aria-[current=location]:font-medium aria-[current=location]:text-foreground"
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
