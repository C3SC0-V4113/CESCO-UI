import { components } from '@/app/registry';

import type { ComponentBase } from '../_components/types';

export const componentBases: ComponentBase[] = ['base', 'radix', 'aria'];

export function generateComponentParams() {
  return componentBases.flatMap((base) => components.map(({ name }) => ({ base, name })));
}

export function isComponentBase(value: string): value is ComponentBase {
  return componentBases.some((base) => base === value);
}

export function componentBaseFromPathname(pathname: string): ComponentBase {
  const base = pathname.split('/')[2];
  return base && isComponentBase(base) ? base : 'base';
}
