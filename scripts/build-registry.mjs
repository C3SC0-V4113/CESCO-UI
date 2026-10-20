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
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

export const BASES = ['base', 'radix', 'aria'];
export const STYLES = ['vega', 'nova', 'maia', 'lyra', 'mira', 'luma', 'rhea', 'sera'];
// Older projects use the "new-york" style, which is built on Radix.
const LEGACY_STYLES = { 'new-york': 'radix' };

const root = path.resolve(import.meta.dirname, '..');
const out = path.join(root, 'public/r');
const tmp = path.join(root, '.registry-build');
const source = readFileSync(path.join(root, 'registry.json'), 'utf8');

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

    for (const style of STYLES) {
      cpSync(baseOut, path.join(out, `${base}-${style}`), { recursive: true });
    }
  }

  for (const [style, base] of Object.entries(LEGACY_STYLES)) {
    cpSync(path.join(tmp, 'out', base), path.join(out, style), { recursive: true });
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}

console.warn(`Registry built in ${path.relative(root, out)}/{style}/{name}.json`);
