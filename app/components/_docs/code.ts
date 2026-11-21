import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import type { ComponentBase } from '../_components/types';

export function readExampleSource(base: ComponentBase, name: string, file: string) {
  const exampleRoot = resolve(process.cwd(), 'app/components/_examples');
  const source = readFileSync(resolve(exampleRoot, base, name, file), 'utf8');

  return source
    .replaceAll(`@/registry/bases/${base}/${name}/${name}`, `@/components/${name}`)
    .trim();
}
