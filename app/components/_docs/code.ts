import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import registry from '@/registry.json';

export function rewriteExampleImports(source: string, name: string) {
  return source.replaceAll(`@/registry/preview/${name}`, `@/components/${name}`);
}

export function readExampleSource(path: string, name: string) {
  const exampleRoot = resolve(process.cwd(), 'app/components/_examples');
  const source = rewriteExampleImports(
    readFileSync(resolve(exampleRoot, path), 'utf8').trim(),
    name
  );
  const declaredDependencies = new Set(
    registry.items.find((item) => item.name === name)?.registryDependencies ?? []
  );
  const importedUiDependencies = new Set(
    [...source.matchAll(/from\s+['"]@\/components\/ui\/([^/'"]+)/g)].map((match) => match[1])
  );

  return {
    source,
    extraUiDependencies: [...importedUiDependencies]
      .filter((dependency) => !declaredDependencies.has(dependency))
      .sort(),
  };
}
