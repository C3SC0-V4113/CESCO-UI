import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { FavoriteToggle as AriaFavoriteToggle } from '@/registry/bases/aria/favorite-toggle/favorite-toggle';
import { FavoriteToggle as BaseFavoriteToggle } from '@/registry/bases/base/favorite-toggle/favorite-toggle';
import { FavoriteToggle as RadixFavoriteToggle } from '@/registry/bases/radix/favorite-toggle/favorite-toggle';

// Every base variant must expose the same public API and behavior.
describe.each([
  { base: 'base', FavoriteToggle: BaseFavoriteToggle },
  { base: 'radix', FavoriteToggle: RadixFavoriteToggle },
  { base: 'aria', FavoriteToggle: AriaFavoriteToggle },
])('FavoriteToggle ($base)', ({ FavoriteToggle }) => {
  it('is an accessible toggle button with a label', () => {
    render(<FavoriteToggle />);

    const button = screen.getByRole('button', { name: 'Add to favorites' });
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('toggles and reports the new state', () => {
    const onFavoriteChange = vi.fn();
    render(<FavoriteToggle label="Favorite" onFavoriteChange={onFavoriteChange} />);

    const button = screen.getByRole('button', { name: 'Favorite' });
    fireEvent.click(button);

    expect(onFavoriteChange).toHaveBeenLastCalledWith(true);
    expect(button.getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(button);

    expect(onFavoriteChange).toHaveBeenLastCalledWith(false);
    expect(button.getAttribute('aria-pressed')).toBe('false');
  });

  it('respects the controlled isFavorite prop', () => {
    render(<FavoriteToggle isFavorite />);

    expect(screen.getByRole('button').getAttribute('aria-pressed')).toBe('true');
  });
});
