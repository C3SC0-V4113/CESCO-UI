import { cn } from 'cn';
import { cacheLife } from 'next/cache';

import {
  CodeBlock as ShadcnCodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
} from '@/components/ui/code-block';
import { highlightCode } from '@/lib/highlighter';

export async function CodeBlock({
  code,
  language,
  title,
  className,
  size = 'default',
}: {
  code: string;
  language: string;
  title: string;
  className?: string;
  size?: 'default' | 'sm';
}) {
  'use cache';
  cacheLife('max');

  const lines = (await highlightCode(code, language)) ?? code.split('\n');
  const sourceLines = code.split('\n');
  const lineOccurrences = new Map<string, number>();

  return (
    <ShadcnCodeBlock size={size} className={cn('min-w-0', className)}>
      <CodeBlockHeader className="sr-only">
        <CodeBlockTitle>{title}</CodeBlockTitle>
      </CodeBlockHeader>
      <CodeBlockActions>
        <CodeBlockCopyButton value={code} />
      </CodeBlockActions>
      <div className="min-w-0 pr-20">
        <CodeBlockContent>
          {lines.map((line, index) => {
            const text = sourceLines[index] ?? '';
            const occurrence = lineOccurrences.get(text) ?? 0;
            lineOccurrences.set(text, occurrence + 1);

            return <CodeBlockLine key={`${text}:${occurrence}`}>{line}</CodeBlockLine>;
          })}
        </CodeBlockContent>
      </div>
    </ShadcnCodeBlock>
  );
}
