'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CopyButton } from './copy-button';
import { ExamplePreview } from './example-preview';

import type { ComponentExample } from '../_docs/types';

export function ExampleCard({ example }: { example: ComponentExample }) {
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border bg-card text-card-foreground">
      <Tabs defaultValue="preview">
        <div className="flex items-center justify-between gap-3 border-b p-3">
          <TabsList aria-label="Example view">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
          <CopyButton value={example.source} />
        </div>
        <TabsContent value="preview">
          <div className="min-h-56 p-6">
            <ExamplePreview preview={example.preview} />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <pre className="max-h-[32rem] max-w-full overflow-auto p-5 text-sm">
            <code>{example.source}</code>
          </pre>
        </TabsContent>
      </Tabs>
      <p className="border-t px-5 py-3 text-sm text-muted-foreground">{example.description}</p>
    </div>
  );
}

export function ExamplesViewer({ examples }: { examples: ComponentExample[] }) {
  if (examples.length === 0) return null;

  return (
    <div className="min-w-0 overflow-hidden">
      <Tabs defaultValue={examples[0].id}>
        <div className="max-w-full overflow-x-auto">
          <TabsList aria-label="Examples" className="h-auto w-max flex-nowrap justify-start">
            {examples.map((example) => (
              <TabsTrigger key={example.id} value={example.id} className="flex-none">
                {example.title}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {examples.map((example) => (
          <TabsContent key={example.id} value={example.id}>
            <ExampleCard example={example} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
