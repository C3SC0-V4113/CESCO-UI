import PhoneInputDemo from './phone-input';

import type { DemoProps } from '@/app/components/_demos/types';
import type { ComponentType } from 'react';

export const demos: Record<string, ComponentType<DemoProps>> = {
  'phone-input': PhoneInputDemo,
};
