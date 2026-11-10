import type { ComponentBase } from '../_components/types';
import type { ReactNode } from 'react';

export type ApiProp = { name: string; type: string; defaultValue: string; description: string };
export type ComponentExample<Id extends string = string> = {
  id: Id;
  title: string;
  description: string;
  source: string;
  preview: ReactNode;
};
export type ComponentDocsPage = (props: { base: ComponentBase }) => ReactNode;

type ExampleDefinition = Omit<ComponentExample, 'id'>;

export function defineExamples<const Examples extends Record<string, ExampleDefinition>>(
  examples: Examples
): { [Id in keyof Examples]: ComponentExample<Id & string> }[keyof Examples][] {
  return Object.entries(examples).map(([id, example]) => ({ id, ...example })) as {
    [Id in keyof Examples]: ComponentExample<Id & string>;
  }[keyof Examples][];
}
