import type { ComponentDocs } from './types';

export const componentDocs = {
  'password-input': () => import('./password-input').then((module) => module.passwordInputDocs),
  'phone-input': () => import('./phone-input').then((module) => module.phoneInputDocs),
} satisfies Record<string, () => Promise<ComponentDocs>>;

export type ComponentName = keyof typeof componentDocs;

export function isComponentName(name: string): name is ComponentName {
  return Object.hasOwn(componentDocs, name);
}
