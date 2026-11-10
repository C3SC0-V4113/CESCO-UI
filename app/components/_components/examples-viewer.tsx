import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { CodeBlock } from './code-block';
import { ExamplePreview } from './example-preview';

import type { ComponentExample } from '../_docs/types';

export function ExampleDependenciesNotice({ dependencies }: { dependencies: string[] }) {
  if (dependencies.length === 0) return null;

  const command = `npx shadcn@latest add ${dependencies.join(' ')}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <span>This example also uses</span>
      <CodeBlock
        code={command}
        language="bash"
        title="Additional shadcn dependencies"
        size="sm"
        className="inline-flex w-auto max-w-full"
      />
    </div>
  );
}

export function ExampleCard({ example }: { example: ComponentExample }) {
  return (
    <Card className="min-w-0">
      <Tabs defaultValue="preview" className="w-full min-w-0">
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
            <div className="min-w-0 py-4">
              <ExamplePreview preview={example.preview} />
            </div>
          </CardContent>
        </TabsContent>
        <TabsContent value="code">
          <div className="space-y-3">
            <ExampleDependenciesNotice dependencies={example.extraUiDependencies} />
            <CodeBlock code={example.source} language="tsx" title={`${example.title} example`} />
          </div>
        </TabsContent>
      </Tabs>
      <CardFooter>{example.description}</CardFooter>
    </Card>
  );
}

export function ExamplesViewer({ examples }: { examples: ComponentExample[] }) {
  if (examples.length === 0) return null;

  return (
    <div className="min-w-0">
      <Tabs defaultValue={examples[0].id} className="w-full min-w-0">
        <div className="w-full min-w-0 overflow-x-auto">
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
