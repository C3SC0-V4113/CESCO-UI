'use client';

import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function usePreviewHydrated() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}
