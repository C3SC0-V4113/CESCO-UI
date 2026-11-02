// Builds one registry per shadcn base-style pair into public/r/<base>-<style>,
// served as https://ui.cescovalle.com/r/{style}/{name}.json.
//
// - Shared items are published unchanged for every base.
// - Items whose file paths contain {base} ship one variant per base, from
//   registry/bases/<base>/.
// - Styles (vega, nova, ...) only change how the shadcn components pulled in
//   through registryDependencies look, so each base's output is copied as-is
//   to all of its styles.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export const BASES = ['base', 'radix', 'aria'];
export const STYLES = ['vega', 'nova', 'maia', 'lyra', 'mira', 'luma', 'rhea', 'sera'];
const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public/r');
const tmp = path.join(root, '.registry-build');
const source = readFileSync(path.join(root, 'registry.json'), 'utf8');

function rewriteBaseUiImports(directory, base) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      rewriteBaseUiImports(entryPath, base);
      continue;
    }
    if (!entry.name.endsWith('.json')) continue;

    const item = JSON.parse(readFileSync(entryPath, 'utf8'));
    let changed = false;
    const files = item.files ?? [];
    const targets = new Map(files.map((file) => [file.path, file.target ?? file.path]));

    function findTarget(sourcePath) {
      for (const candidate of [sourcePath, `${sourcePath}.tsx`, `${sourcePath}.ts`]) {
        if (targets.has(candidate)) return targets.get(candidate);
      }
      return undefined;
    }

    function installedImport(specifier, file) {
      let target;
      if (specifier.startsWith('@/registry/')) {
        target = findTarget(`registry/${specifier.slice('@/registry/'.length)}`);
      } else if (specifier.startsWith('.')) {
        const sourcePath = path.posix.normalize(
          path.posix.join(path.posix.dirname(file.path), specifier)
        );
        target = findTarget(sourcePath);
        if (target) {
          let relative = path.posix.relative(path.posix.dirname(file.target ?? file.path), target);
          relative = relative.replace(/\.(?:tsx?|jsx?)$/, '');
          return relative.startsWith('.') ? relative : `./${relative}`;
        }
      }

      return target ? `@/${target.replace(/\.(?:tsx?|jsx?)$/, '')}` : specifier;
    }

    for (const file of files) {
      if (!file.content) continue;
      const content = file.content
        .replaceAll(`@/registry/bases/${base}/ui/`, '@/components/ui/')
        .replace(/(\bfrom\s+)(['"])([^'"]+)\2/g, (match, from, quote, specifier) => {
          const rewritten = installedImport(specifier, file);
          return rewritten === specifier ? match : `${from}${quote}${rewritten}${quote}`;
        });
      changed ||= content !== file.content;
      file.content = content;
    }
    if (changed) writeFileSync(entryPath, `${JSON.stringify(item, null, 2)}\n`);
  }
}

rmSync(out, { recursive: true, force: true });
rmSync(tmp, { recursive: true, force: true });
mkdirSync(tmp, { recursive: true });

try {
  for (const base of BASES) {
    const registryFile = path.join(tmp, `registry-${base}.json`);
    writeFileSync(registryFile, source.replaceAll('{base}', base));

    const baseOut = path.join(tmp, 'out', base);
    execFileSync('npx', ['shadcn', 'build', registryFile, '-o', baseOut], {
      cwd: root,
      stdio: 'inherit',
    });
    rewriteBaseUiImports(baseOut, base);

    for (const style of STYLES) {
      cpSync(baseOut, path.join(out, `${base}-${style}`), { recursive: true });
    }
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.warn(`Registry built in ${path.relative(root, out)}/{style}/{name}.json`);
