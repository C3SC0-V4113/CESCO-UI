// @vitest-environment node
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { describe, expect, it } from 'vitest';

const root = path.resolve(import.meta.dirname, '../../..');
const BASES = ['base', 'radix', 'aria'];
const ICON_LIBRARIES = ['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon'];

type RegistryItem = { name: string; files?: { path: string }[] };
const registry = JSON.parse(readFileSync(path.join(root, 'registry.json'), 'utf8')) as {
  items: RegistryItem[];
};

// Resolves the files of an item for every base it is published for.
function getItemFiles(item: RegistryItem) {
  return (item.files ?? []).flatMap(({ path: filePath }) =>
    filePath.includes('{base}')
      ? BASES.map((base) => filePath.replaceAll('{base}', base))
      : [filePath]
  );
}

describe.each(registry.items)('registry item $name', (item) => {
  const files = getItemFiles(item);

  it('has a source file for every base it is published for', () => {
    expect(files.length).toBeGreaterThan(0);
    const missing = files.filter((file) => !existsSync(path.join(root, file)));
    expect(missing).toEqual([]);
  });

  it('names an icon for every icon library in each IconPlaceholder', () => {
    const missing = files.flatMap((file) => {
      const source = readFileSync(path.join(root, file), 'utf8');
      const placeholders = source.match(/<IconPlaceholder\b[^>]*\/>/g) ?? [];
      return placeholders.flatMap((placeholder) =>
        ICON_LIBRARIES.filter(
          (library) => !new RegExp(`\\b${library}="\\w+"`).test(placeholder)
        ).map((library) => `${file}: ${library}`)
      );
    });
    expect(missing).toEqual([]);
  });

  it('uses no raw palette colors', () => {
    const withRawColors = files.filter((file) =>
      readFileSync(path.join(root, file), 'utf8').match(
        /\b(?:bg|text|border|ring|fill|stroke)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)\b/
      )
    );
    expect(withRawColors).toEqual([]);
  });
});
