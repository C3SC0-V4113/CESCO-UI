import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

export function readExampleSource(path: string) {
  const exampleRoot = resolve(process.cwd(), 'app/components/_examples');
  return readFileSync(resolve(exampleRoot, path), 'utf8').trim();
}
