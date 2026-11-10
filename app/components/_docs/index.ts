import type { ComponentDocsPage } from './types';

export const componentDocs = {
  'password-input': () => import('./password-input').then((module) => module.PasswordInputDocsPage),
  'phone-input': () => import('./phone-input').then((module) => module.PhoneInputDocsPage),
} satisfies Record<string, () => Promise<ComponentDocsPage>>;

export type ComponentName = keyof typeof componentDocs;

export function isComponentName(name: string): name is ComponentName {
  return Object.hasOwn(componentDocs, name);
}
