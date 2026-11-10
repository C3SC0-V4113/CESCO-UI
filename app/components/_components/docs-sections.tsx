import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CodeBlock } from './code-block';
import { ExamplePreview } from './example-preview';

import type { ApiProp, ComponentExample } from '../_docs/types';

function ExampleCode({ example }: { example: ComponentExample }) {
  const previewLines = example.source.split('\n').slice(0, 4).join('\n');

  return (
    <div className="border-t">
      <Collapsible className="group/code-collapse">
        <div className="relative max-h-28 overflow-hidden px-4 py-3 group-data-[open]/code-collapse:hidden">
          <pre className="overflow-hidden font-mono text-xs leading-relaxed whitespace-pre text-muted-foreground">
            <code>{previewLines}</code>
          </pre>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent"
          />
        </div>
        <CollapsibleContent>
          <div className="min-w-0 p-3">
            <CodeBlock code={example.source} language="tsx" title={`${example.title} example`} />
          </div>
        </CollapsibleContent>
        <div className="px-4">
          <CollapsibleTrigger
            render={<Button variant="ghost" size="sm" className="w-full justify-between" />}
          >
            <span className="group-data-[open]/code-collapse:hidden">View Code</span>
            <span className="hidden group-data-[open]/code-collapse:inline">Hide Code</span>
            <ChevronDownIcon
              aria-hidden="true"
              className="size-4 transition-transform group-data-[open]/code-collapse:rotate-180"
            />
          </CollapsibleTrigger>
        </div>
      </Collapsible>
    </div>
  );
}

function ExampleShowcase({ example }: { example: ComponentExample }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border bg-card">
      <div className="min-w-0 px-5 py-6 sm:px-8 sm:py-8">
        <ExamplePreview preview={example.preview} />
      </div>
      <ExampleCode example={example} />
    </div>
  );
}

export function ComponentPreview({ example }: { example: ComponentExample }) {
  return (
    <section id="preview" aria-labelledby="preview-heading" className="min-w-0 space-y-4">
      <h2 id="preview-heading" className="text-xl font-semibold tracking-tight">
        Preview
      </h2>
      <ExampleShowcase example={example} />
    </section>
  );
}

export function InstallationSection({ name }: { name: string }) {
  const commands = [
    { value: 'pnpm', label: 'pnpm', command: `pnpm dlx shadcn@latest add @cesco/${name}` },
    { value: 'npm', label: 'npm', command: `npx shadcn@latest add @cesco/${name}` },
    { value: 'yarn', label: 'yarn', command: `yarn dlx shadcn@latest add @cesco/${name}` },
    { value: 'bun', label: 'bun', command: `bunx --bun shadcn@latest add @cesco/${name}` },
  ] as const;

  return (
    <section id="installation" aria-labelledby="installation-heading" className="min-w-0 space-y-4">
      <h2 id="installation-heading" className="text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <Tabs defaultValue="npm">
        <TabsList aria-label="Package manager">
          {commands.map(({ value, label }) => (
            <TabsTrigger key={value} value={value}>
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {commands.map(({ value, label, command }) => (
          <TabsContent key={value} value={value}>
            <CodeBlock code={command} language="bash" title={`${label} install command`} />
          </TabsContent>
        ))}
      </Tabs>
      <div className="space-y-2 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          First time? Add the @cesco registry to <code>components.json</code>.
        </p>
        <CodeBlock
          code={`{
  "registries": {
    "@cesco": "https://ui.cescovalle.com/r/{style}/{name}.json"
  }
}`}
          language="json"
          title="Registry configuration"
          size="sm"
        />
      </div>
    </section>
  );
}

export function UsageSection({ usage }: { usage: string }) {
  return (
    <section id="usage" aria-labelledby="usage-heading" className="min-w-0 space-y-4">
      <h2 id="usage-heading" className="text-xl font-semibold tracking-tight">
        Usage
      </h2>
      <CodeBlock code={usage} language="tsx" title="Usage" />
    </section>
  );
}

export function ExamplesSection({ examples }: { examples: ComponentExample[] }) {
  if (examples.length === 0) return null;

  return (
    <section id="examples" aria-labelledby="examples-heading" className="min-w-0 space-y-8">
      <h2 id="examples-heading" className="text-xl font-semibold tracking-tight">
        Examples
      </h2>
      {examples.map((example) => (
        <section
          key={example.id}
          id={`example-${example.id}`}
          aria-labelledby={`example-${example.id}-heading`}
          className="min-w-0 space-y-3"
        >
          <h3 id={`example-${example.id}-heading`} className="text-lg font-medium tracking-tight">
            {example.title}
          </h3>
          <p className="text-sm text-muted-foreground">{example.description}</p>
          <ExampleShowcase example={example} />
        </section>
      ))}
    </section>
  );
}

export function ApiReference({ props }: { props: ApiProp[] }) {
  return (
    <section id="api-reference" aria-labelledby="api-heading" className="min-w-0 space-y-4">
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
