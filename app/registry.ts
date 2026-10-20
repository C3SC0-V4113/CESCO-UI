import registry from '@/registry.json';

export type RegistryComponent = {
  name: string;
  title: string;
  description: string;
};

export const components = registry.items as RegistryComponent[];
