'use client';

import { type ComponentProps } from 'react';

import { Toggle } from '@/registry/bases/base/ui/toggle';
import { IconPlaceholder } from '@/registry/shared/lib/icon-placeholder';

// Base UI variant: the toggle state is pressed / onPressedChange and the pressed state is
// exposed as aria-pressed.
function FavoriteToggle({
  isFavorite,
  isFavoriteByDefault,
  onFavoriteChange,
  label = 'Add to favorites',
  ...props
}: Omit<
  ComponentProps<typeof Toggle>,
  'pressed' | 'defaultPressed' | 'onPressedChange' | 'children'
> & {
  isFavorite?: boolean;
  isFavoriteByDefault?: boolean;
  onFavoriteChange?: (isFavorite: boolean) => void;
  label?: string;
}) {
  return (
    <Toggle
      data-slot="favorite-toggle"
      aria-label={label}
      pressed={isFavorite}
      defaultPressed={isFavoriteByDefault}
      onPressedChange={(pressed: boolean) => onFavoriteChange?.(pressed)}
      {...props}
    >
      <IconPlaceholder
        lucide="HeartIcon"
        tabler="IconHeart"
        hugeicons="FavouriteIcon"
        phosphor="HeartIcon"
        remixicon="RiHeartLine"
        className="group-aria-pressed/toggle:fill-current"
      />
    </Toggle>
  );
}

export { FavoriteToggle };
