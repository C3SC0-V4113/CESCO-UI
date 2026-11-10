import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import { configure, fireEvent, render, screen } from '@testing-library/react';
import ts from 'typescript';
import { describe, expect, it, vi } from 'vitest';

import { passwordInputApi, phoneInputApi } from '@/app/components/_docs/api';
import {
  componentBaseFromPathname,
  componentBases,
  generateComponentParams,
} from '@/app/components/_docs/routes';
import { Button } from '@/components/ui/button';
import { CodeBlockCopyButton } from '@/components/ui/code-block';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import registry from '@/registry.json';

const exampleRoot = 'app/components/_examples';
const bases = ['base', 'radix', 'aria'] as const;

configure({ testIdAttribute: 'data-slot' });

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

describe('component documentation routes', () => {
  it('generates a static route for each component and base', () => {
    const params = generateComponentParams();
    expect(params).toHaveLength(registry.items.length * componentBases.length);
    expect(params).toContainEqual({ base: 'aria', name: 'phone-input' });
    expect(params).toContainEqual({ base: 'radix', name: 'password-input' });
  });

  it('keeps a base when parsing a component URL and defaults legacy URLs to base', () => {
    expect(componentBaseFromPathname('/components/radix/phone-input')).toBe('radix');
    expect(componentBaseFromPathname('/components/aria/password-input')).toBe('aria');
    expect(componentBaseFromPathname('/components/password-input')).toBe('base');
  });
});

describe('per-base example imports', () => {
  it('keeps one installable source example and generates direct imports for each base', () => {
    for (const { name } of registry.items) {
      const files = readdirSync(join(exampleRoot, name)).filter((file) => file.endsWith('.tsx'));
      expect(files.length).toBeGreaterThan(0);

      for (const file of files) {
        const source = readFileSync(join(exampleRoot, name, file), 'utf8');
        expect(source).toContain(`from '@/components/${name}'`);
        expect(source).not.toMatch(/from ['"]@\/app\//);
        expect(source).not.toMatch(/from ['"]@\/registry\//);

        for (const base of bases) {
          const generated = readFileSync(join(exampleRoot, 'generated', base, name, file), 'utf8');
          expect(generated).toContain(`from '@/registry/bases/${base}/${name}/${name}'`);
          expect(generated).not.toContain(`from '@/components/${name}'`);
        }
      }
    }
  });
});

describe('documented component APIs', () => {
  it('matches phone input docs to its declared public props', () => {
    const path = 'registry/shared/components/phone-input.tsx';
    expect(declaredProps(path, 'PhoneInputProps')).toEqual(
      documentedProps(phoneInputApi, 'InputHTMLAttributes')
    );
    const types = sourcePropTypes(path, 'PhoneInputProps');
    const defaults = sourceParameterDefaults(path, 'PhoneInputCore');
    const props = phoneInputApi.filter((item) => item.name !== 'InputHTMLAttributes');
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
      documentedProps(passwordInputApi, 'InputGroupInput attributes')
    );
    const types = sourcePropTypes(relativePath, 'PasswordInputProps');
    const defaults = sourceParameterDefaults(relativePath, 'PasswordInput');
    const props = passwordInputApi.filter((item) => item.name !== 'InputGroupInput attributes');
    const documented = Object.fromEntries(
      props.map(({ name, type, defaultValue }) => [name, { type, defaultValue }])
    );
    const source = Object.fromEntries(
      props.map(({ name }) => [name, { type: types.get(name), defaultValue: defaults.get(name) }])
    );
    expect(documented).toEqual(source);
  });
});

describe('shadcn code controls', () => {
  it('copies code and announces success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    render(<CodeBlockCopyButton value="example source" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await screen.findByRole('button', { name: 'Copied' });
    expect(writeText).toHaveBeenCalledWith('example source');
  });

  it('expands the collapsible code content', async () => {
    render(
      <Collapsible>
        <CollapsibleTrigger render={<Button variant="ghost" />}>View Code</CollapsibleTrigger>
        <CollapsibleContent>Full example source</CollapsibleContent>
      </Collapsible>
    );

    fireEvent.click(screen.getByRole('button', { name: 'View Code' }));
    expect(await screen.findByText('Full example source')).toBeTruthy();
  });
});
