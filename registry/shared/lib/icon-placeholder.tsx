// Dev and test only. `shadcn add` replaces every <IconPlaceholder /> with the
// icon of the library set in the user's components.json (lucide, tabler,
// hugeicons, phosphor or remixicon) and drops this import, which is why its
// path must contain "icon-placeholder". Here it renders the lucide icon.
import { icons, type LucideProps } from 'lucide-react';

type IconPlaceholderProps = {
  lucide: string;
  tabler: string;
  hugeicons: string;
  phosphor: string;
  remixicon: string;
} & LucideProps;

const lucideIcons: Record<string, (typeof icons)[keyof typeof icons]> = icons;
const ICON_LIBRARIES = new Set(['lucide', 'tabler', 'hugeicons', 'phosphor', 'remixicon']);

function IconPlaceholder({ lucide, ...rest }: IconPlaceholderProps) {
  const Icon = lucideIcons[lucide.replace(/Icon$/, '')];
  const props = Object.fromEntries(
    Object.entries(rest).filter(([name]) => !ICON_LIBRARIES.has(name))
  );

  if (!Icon) {
    throw new Error(`IconPlaceholder: "${lucide}" is not a lucide-react icon.`);
  }

  return <Icon aria-hidden {...props} />;
}

export { IconPlaceholder };
