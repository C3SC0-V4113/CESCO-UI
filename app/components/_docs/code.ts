import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function rewriteExampleImports(source: string, name: string) {
  return source.replaceAll(`@/registry/preview/${name}`, `@/components/${name}`);
}

export function readExampleSource(path: string, name: string) {
  const exampleRoot = resolve(process.cwd(), 'app/components/_examples');
  return rewriteExampleImports(readFileSync(resolve(exampleRoot, path), 'utf8').trim(), name);
}
