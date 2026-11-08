import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CopyButton } from './copy-button';

import type { ApiProp } from '../_docs/types';

export function InstallationSection({ name }: { name: string }) {
  const command = `npx shadcn@latest add @cesco/${name}`;
  return (
    <section aria-labelledby="installation-heading" className="min-w-0 space-y-4">
      <h2 id="installation-heading" className="text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/40 p-4">
        <code className="overflow-x-auto text-sm">{command}</code>
        <CopyButton value={command} />
      </div>
      <p className="text-sm text-muted-foreground">
        Add the Cesco registry to <code>components.json</code>:
      </p>
      <pre className="max-w-full overflow-auto rounded-lg border bg-muted/40 p-4 text-sm">
        <code>{`{
  "registries": {
    "@cesco": "https://ui.cescovalle.com/r/{style}/{name}.json"
  }
}`}</code>
      </pre>
    </section>
  );
}

export function UsageSection({ usage }: { usage: string }) {
  return (
    <section aria-labelledby="usage-heading" className="min-w-0 space-y-4">
      <h2 id="usage-heading" className="text-xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="max-w-full overflow-auto rounded-lg border bg-muted/40 p-4 text-sm">
        <code>{usage}</code>
      </pre>
    </section>
  );
}

export function ApiReference({ props }: { props: ApiProp[] }) {
  return (
    <section aria-labelledby="api-heading" className="min-w-0 space-y-4">
      <h2 id="api-heading" className="text-xl font-semibold tracking-tight">
        API Reference
      </h2>
      <div className="min-w-0 rounded-lg border">
        <ScrollArea className="w-full min-w-0">
          <div className="min-w-[48rem]">
            <Table className="min-w-[48rem] table-fixed text-left">
              <colgroup>
                <col className="w-[25%]" />
                <col className="w-[25%]" />
                <col className="w-[20%]" />
                <col className="w-[30%]" />
              </colgroup>
              <TableHeader>
                <TableRow>
                  <TableHead>Prop</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.map((prop) => (
                  <TableRow key={prop.name}>
                    <TableHead scope="row" className="whitespace-normal">
                      <span className="font-mono font-normal">{prop.name}</span>
                    </TableHead>
                    <TableCell className="break-words whitespace-normal">
                      <code>{prop.type}</code>
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      <code>{prop.defaultValue}</code>
                    </TableCell>
                    <TableCell className="break-words whitespace-normal">
                      <span className="text-muted-foreground">{prop.description}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
}
