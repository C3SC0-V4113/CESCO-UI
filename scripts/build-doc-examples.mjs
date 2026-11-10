import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import registry from '../registry.json' with { type: 'json' };

const bases = ['base', 'radix', 'aria'];
const sourceRoot = resolve('app/components/_examples');
const outputRoot = resolve(sourceRoot, 'generated');

rmSync(outputRoot, { recursive: true, force: true });

for (const { name } of registry.items) {
  const componentSource = resolve(sourceRoot, name);
  const examples = readdirSync(componentSource).filter((file) => file.endsWith('.tsx'));

  for (const base of bases) {
    const outputDirectory = resolve(outputRoot, base, name);
    mkdirSync(outputDirectory, { recursive: true });

    for (const file of examples) {
      const source = readFileSync(resolve(componentSource, file), 'utf8');
      const baseImport = `@/registry/bases/${base}/${name}/${name}`;
      const rewritten = source
        .replaceAll(`@/components/${name}`, baseImport)
        .replace(
          /(import \{ (?:PasswordInput|PhoneInput) \} from '@\/registry\/bases\/[^']+';)\n(import \{ Field, FieldDescription, FieldLabel \} from '@\/components\/ui\/field';)/g,
          '$2\n$1'
        );

      if (rewritten === source) {
        throw new Error(`${name}/${file} must import its component from @/components/${name}.`);
      }

      writeFileSync(resolve(outputDirectory, file), rewritten);
    }
  }
}

process.stdout.write(`Built per-base documentation examples in ${outputRoot}\n`);
