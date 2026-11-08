import { cacheLife } from 'next/cache';
import { codeToHtml } from 'shiki';

import { Card, CardContent } from '@/components/ui/card';
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
  const copyButtonPosition = code.includes('\n') ? 'top-3' : 'top-1/2 -translate-y-1/2';

  return (
    <Card size="sm" className="min-w-0">
      <CardContent>
        <div className="relative min-h-7 min-w-0 pr-20">
          <CopyButton value={code} className={copyButtonPosition} />
          <ScrollArea className="w-full min-w-0">
            <div
              className="shiki-code min-w-max pb-3 text-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
