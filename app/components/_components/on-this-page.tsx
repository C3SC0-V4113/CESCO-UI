'use client';

import Link from 'next/link';
import { useMemo, useSyncExternalStore } from 'react';

export type PageSectionLink = { id: string; title: string };

function createSectionScrollStore(sections: PageSectionLink[]) {
  const ids = sections.map(({ id }) => id);
  const sectionIds = new Set(ids);
  const listeners = new Set<() => void>();
  let activeId = ids[0] ?? '';

  const getSnapshot = () => activeId;
  const getServerSnapshot = () => ids[0] ?? '';
  const publish = (id: string) => {
    if (!id || id === activeId) return;
    activeId = id;
    listeners.forEach((listener) => listener());
  };
  const updateFromScroll = () => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (!elements.length) return;

    const atBottom =
      window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atBottom) {
      publish(elements.at(-1)?.id ?? '');
      return;
    }

    const threshold = Math.min(160, window.innerHeight * 0.2);
    const active = [...elements]
      .reverse()
      .find((element) => element.getBoundingClientRect().top <= threshold);
    publish(active?.id ?? elements[0]?.id ?? '');
  };
  const setFromHash = () => {
    const id = window.location.hash.slice(1);
    if (sectionIds.has(id)) publish(id);
    requestAnimationFrame(updateFromScroll);
  };
  const onClick = (event: MouseEvent) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.hash.slice(1);
    if (id && sectionIds.has(id)) publish(id);
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    if (listeners.size === 1) {
      window.addEventListener('scroll', updateFromScroll, { passive: true });
      window.addEventListener('resize', updateFromScroll);
      window.addEventListener('hashchange', setFromHash);
      window.addEventListener('load', setFromHash);
      document.addEventListener('click', onClick);
      updateFromScroll();
      if (window.location.hash) setFromHash();
    }
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        window.removeEventListener('scroll', updateFromScroll);
        window.removeEventListener('resize', updateFromScroll);
        window.removeEventListener('hashchange', setFromHash);
        window.removeEventListener('load', setFromHash);
        document.removeEventListener('click', onClick);
      }
    };
  };

  return { getSnapshot, getServerSnapshot, subscribe };
}

export function OnThisPage({ sections }: { sections: PageSectionLink[] }) {
  const store = useMemo(() => createSectionScrollStore(sections), [sections]);
  const activeId = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot
  );

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
