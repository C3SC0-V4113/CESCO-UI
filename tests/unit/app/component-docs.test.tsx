import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { configure, fireEvent, render, screen } from '@testing-library/react';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

import { ComponentBaseProvider } from '@/app/components/_components/base-context';
import { rewriteExampleImports } from '@/app/components/_docs/code';
import { passwordInputDocs } from '@/app/components/_docs/password-input';
import { phoneInputDocs } from '@/app/components/_docs/phone-input';
import { CodeBlockCopyButton } from '@/components/ui/code-block';
import { PasswordInput as PasswordInputPreview } from '@/registry/preview/password-input';
import { PhoneInput as PhoneInputPreview } from '@/registry/preview/phone-input';
import registry from '@/registry.json';

const bases = ['base', 'radix', 'aria'] as const;

configure({ testIdAttribute: 'data-preview-base' });

function declaredProps(relativePath: string, typeName: string) {
  const source = ts.createSourceFile(
    relativePath,
    readFileSync(join(process.cwd(), relativePath), 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const declaration = source.statements.find(
    (statement): statement is ts.TypeAliasDeclaration =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === typeName
  );
  if (!declaration) throw new Error(`${typeName} was not found in ${relativePath}`);

  const names = new Set<string>();
  function visit(node: ts.Node) {
    if (ts.isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && member.name && ts.isIdentifier(member.name)) {
          names.add(member.name.text);
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(declaration.type);
  return [...names].sort();
}

function sourcePropTypes(relativePath: string, typeName: string) {
  const source = ts.createSourceFile(
    relativePath,
    readFileSync(join(process.cwd(), relativePath), 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const declaration = source.statements.find(
    (statement): statement is ts.TypeAliasDeclaration =>
      ts.isTypeAliasDeclaration(statement) && statement.name.text === typeName
  );
  if (!declaration) throw new Error(`${typeName} was not found in ${relativePath}`);

  const props = new Map<string, string>();
  function visit(node: ts.Node) {
    if (ts.isTypeLiteralNode(node)) {
      for (const member of node.members) {
        if (
          ts.isPropertySignature(member) &&
          member.name &&
          ts.isIdentifier(member.name) &&
          member.type
        ) {
          props.set(member.name.text, member.type.getText(source));
        }
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(declaration.type);
  return props;
}

function sourceParameterDefaults(relativePath: string, functionName: string) {
  const source = ts.createSourceFile(
    relativePath,
    readFileSync(join(process.cwd(), relativePath), 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const declaration = source.statements.find(
    (statement): statement is ts.FunctionDeclaration =>
      ts.isFunctionDeclaration(statement) && statement.name?.text === functionName
  );
  if (
    !declaration ||
    !declaration.parameters[0] ||
    !ts.isObjectBindingPattern(declaration.parameters[0].name)
  ) {
    throw new Error(`${functionName} defaults were not found in ${relativePath}`);
  }
  const defaults = new Map<string, string>();
  for (const binding of declaration.parameters[0].name.elements) {
    if (!ts.isIdentifier(binding.name)) continue;
    const initializer = binding.initializer;
    if (initializer && ts.isStringLiteral(initializer)) {
      defaults.set(binding.name.text, JSON.stringify(initializer.text));
    } else if (initializer) {
      defaults.set(binding.name.text, initializer.getText(source));
    } else {
      defaults.set(binding.name.text, 'undefined');
    }
  }
  return defaults;
}

function documentedProps(rows: { name: string }[], summaryRow: string) {
  return rows
    .map(({ name }) => name)
    .filter((name) => name !== summaryRow)
    .sort();
}

describe('example source rewrites', () => {
  it('rewrites only the preview import to the installed component path', () => {
    expect(
      rewriteExampleImports(
        "import { PhoneInput } from '@/registry/preview/phone-input';\nimport x from '@/registry/preview/other';",
        'phone-input'
      )
    ).toBe(
      "import { PhoneInput } from '@/components/phone-input';\nimport x from '@/registry/preview/other';"
    );
  });

  it('keeps every shown example import installable outside the docs app', () => {
    const packageJson = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8')) as {
      dependencies: Record<string, string>;
    };

    for (const { name, examples } of [
      { name: 'password-input', examples: passwordInputDocs.examples },
      { name: 'phone-input', examples: phoneInputDocs.examples },
    ]) {
      const component = registry.items.find((item) => item.name === name);
      expect(component, `${name} is missing from registry.json`).toBeDefined();
      const registryDependencies = component?.registryDependencies ?? [];

      for (const example of examples) {
        const source = ts.createSourceFile(
          `${example.id}.tsx`,
          example.source,
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX
        );
        const uiDependencies = new Set<string>();

        for (const statement of source.statements) {
          if (
            !ts.isImportDeclaration(statement) ||
            !ts.isStringLiteral(statement.moduleSpecifier)
          ) {
            continue;
          }
          const moduleName = statement.moduleSpecifier.text;
          const packageName = moduleName.startsWith('@')
            ? moduleName.split('/').slice(0, 2).join('/')
            : moduleName.split('/')[0];
          const uiDependency = moduleName.match(/^@\/components\/ui\/([^/]+)/)?.[1];
          const installableAliases = ['@/components/ui/', '@/components/'];

          expect(moduleName).not.toMatch(/^@\/app\//);
          expect(moduleName).not.toMatch(/^@\/registry\//);
          expect(
            moduleName === 'react' ||
              installableAliases.some((prefix) => moduleName.startsWith(prefix)) ||
              packageName in packageJson.dependencies,
            `${example.id} imports non-installable module ${moduleName}`
          ).toBe(true);

          if (uiDependency) uiDependencies.add(uiDependency);
        }

        const expectedExtras = [...uiDependencies]
          .filter((dependency) => !registryDependencies.includes(dependency))
          .sort();
        expect(example.extraUiDependencies, `${name}/${example.id} extra UI dependencies`).toEqual(
          expectedExtras
        );
        for (const dependency of uiDependencies) {
          expect(
            [...registryDependencies, ...example.extraUiDependencies],
            `${name}/${example.id} does not declare or render ${dependency}`
          ).toContain(dependency);
        }
      }
    }
  });

  it('copies code and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(<CodeBlockCopyButton value="example source" />);
    const button = screen.getByRole('button', { name: 'Copy' });

    fireEvent.click(button);
    await screen.findByRole('button', { name: 'Copied' });
    expect(screen.getByText('Copied')).toBeTruthy();
    expect(writeText).toHaveBeenCalledWith('example source');
  });
});

describe.each(bases)('preview wrappers on %s', (base) => {
  it('renders the selected password base', () => {
    render(
      <ComponentBaseProvider value={base}>
        <PasswordInputPreview aria-label="Password" />
      </ComponentBaseProvider>
    );
    expect(screen.getByTestId(base)).toBeDefined();
  });

  it('renders the selected phone base', () => {
    render(
      <ComponentBaseProvider value={base}>
        <PhoneInputPreview aria-label="Phone number" />
      </ComponentBaseProvider>
    );
    expect(screen.getByTestId(base)).toBeDefined();
  });
});

describe('documented component APIs', () => {
  it('matches phone input docs to its declared public props', () => {
    const path = 'registry/shared/components/phone-input.tsx';
    expect(declaredProps(path, 'PhoneInputProps')).toEqual(
      documentedProps(phoneInputDocs.api, 'InputHTMLAttributes')
    );
    const types = sourcePropTypes(path, 'PhoneInputProps');
    const defaults = sourceParameterDefaults(path, 'PhoneInputCore');
    const props = phoneInputDocs.api.filter((item) => item.name !== 'InputHTMLAttributes');
    const documented = Object.fromEntries(
      props.map(({ name, type, defaultValue }) => [name, { type, defaultValue }])
    );
    const source = Object.fromEntries(
      props.map(({ name }) => {
        const sourceDefault = defaults.get(name);
        const defaultValue =
          name === 'countries'
            ? 'all countries'
            : sourceDefault === 'EMPTY_PINNED_COUNTRIES'
              ? '[]'
              : sourceDefault;
        return [name, { type: types.get(name), defaultValue }];
      })
    );
    expect(defaults.get('countries'), 'countries source default').toBe('undefined');
    expect(documented).toEqual(source);
  });

  it.each(bases)('matches %s password docs to its declared custom props', (base) => {
    const relativePath = `registry/bases/${base}/password-input/password-input.tsx`;
    expect(declaredProps(relativePath, 'PasswordInputProps')).toEqual(
      documentedProps(passwordInputDocs.api, 'InputGroupInput attributes')
    );
    const types = sourcePropTypes(relativePath, 'PasswordInputProps');
    const defaults = sourceParameterDefaults(relativePath, 'PasswordInput');
    const props = passwordInputDocs.api.filter(
      (item) => item.name !== 'InputGroupInput attributes'
    );
    const documented = Object.fromEntries(
      props.map(({ name, type, defaultValue }) => [name, { type, defaultValue }])
    );
    const source = Object.fromEntries(
      props.map(({ name }) => [name, { type: types.get(name), defaultValue: defaults.get(name) }])
    );
    expect(documented).toEqual(source);
  });
});
