'use client';

import { createContext, useContext } from 'react';

import type { ComponentBase } from './types';

const ComponentBaseContext = createContext<ComponentBase>('base');

export const ComponentBaseProvider = ComponentBaseContext.Provider;

export function useComponentBase() {
  return useContext(ComponentBaseContext);
}
