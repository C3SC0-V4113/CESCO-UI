'use client';

import { ChevronDownIcon } from 'lucide-react';
import { useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export function ExampleCodeDisclosure({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div data-slot="example-code-disclosure">
      <Collapsible
        className="group/example-code-disclosure relative"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="relative max-h-36 overflow-hidden px-3 pt-3 group-data-[open]/example-code-disclosure:max-h-none">
          <CollapsibleContent keepMounted hidden={false} inert={!open}>
            {children}
          </CollapsibleContent>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-card via-card/90 to-transparent group-data-[open]/example-code-disclosure:hidden"
          />
        </div>
        <div className="absolute inset-x-0 bottom-3 z-30 flex justify-center group-data-[open]/example-code-disclosure:static group-data-[open]/example-code-disclosure:pt-2 group-data-[open]/example-code-disclosure:pb-4">
          <CollapsibleTrigger render={<Button variant="secondary" size="sm" />}>
            <span className="group-data-[open]/example-code-disclosure:hidden">View code</span>
            <span className="hidden group-data-[open]/example-code-disclosure:inline">
              Hide code
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 group-data-[open]/example-code-disclosure:rotate-180 motion-safe:transition-transform"
            />
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}
