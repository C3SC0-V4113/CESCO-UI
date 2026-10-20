'use client';

import { type ComponentProps } from 'react';

import { Toggle } from '@/registry/bases/aria/ui/toggle';
import { IconPlaceholder } from '@/registry/shared/lib/icon-placeholder';

// React Aria variant: the toggle state is isSelected / onChange and the pressed state is
// exposed as data-selected.
function FavoriteToggle({
  isFavorite,
  isFavoriteByDefault,
  onFavoriteChange,
  label = 'Add to favorites',
  ...props
}: Omit<
  ComponentProps<typeof Toggle>,
  'isSelected' | 'defaultSelected' | 'onChange' | 'children'
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
      isSelected={isFavorite}
      defaultSelected={isFavoriteByDefault}
      onChange={(isSelected: boolean) => onFavoriteChange?.(isSelected)}
      {...props}
    >
      <IconPlaceholder
        lucide="HeartIcon"
        tabler="IconHeart"
        hugeicons="FavouriteIcon"
        phosphor="HeartIcon"
        remixicon="RiHeartLine"
        className="group-data-selected/toggle:fill-current"
      />
    </Toggle>
  );
}

export { FavoriteToggle };
