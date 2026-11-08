import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CodeBlock } from './code-block';
import { ExamplePreview } from './example-preview';

import type { ComponentExample } from '../_docs/types';

export function ExampleCard({ example }: { example: ComponentExample }) {
  return (
    <Card className="min-w-0">
      <Tabs defaultValue="preview">
        <CardHeader>
          <div className="flex items-center justify-between gap-3 border-b pb-4">
            <TabsList aria-label="Example view">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>
        <TabsContent value="preview">
          <CardContent>
            <div className="min-h-56 p-6">
              <ExamplePreview preview={example.preview} />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="code">
          <CodeBlock code={example.source} language="tsx" />
        </TabsContent>
      </Tabs>
      <CardFooter>{example.description}</CardFooter>
    </Card>
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
