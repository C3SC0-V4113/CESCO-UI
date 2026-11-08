import { cacheLife } from 'next/cache';
import { codeToHtml } from 'shiki';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

import { CopyButton } from './copy-button';

type CodeLanguage = 'bash' | 'json' | 'tsx';

export async function CodeBlock({ code, language }: { code: string; language: CodeLanguage }) {
  'use cache';
  cacheLife('max');

  const html = await codeToHtml(code, {
    lang: language,
    themes: { light: 'github-light', dark: 'github-dark' },
    defaultColor: false,
  });

  return (
    <Card className="min-w-0">
      <CardHeader>
        <div className="flex justify-end">
          <CopyButton value={code} />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="w-full min-w-0">
          <div
            className="shiki-code min-w-max pb-4 text-sm"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
