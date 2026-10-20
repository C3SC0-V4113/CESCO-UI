import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { IconPlaceholder } from '@/registry/shared/lib/icon-placeholder';

// Base-agnostic: it only composes shadcn components declared in
// registryDependencies, which install in the user's base and style, and only
// uses semantic tokens, so it follows their colors, radius and font.
function StatCard({
  title,
  value,
  change,
  description,
  className,
}: {
  title: string;
  value: string;
  change: number;
  description?: string;
  className?: string;
}) {
  const isPositive = change >= 0;

  return (
    <Card data-slot="stat-card" className={className}>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle>{value}</CardTitle>
        <CardAction>
          <Badge variant={isPositive ? 'secondary' : 'destructive'}>
            {isPositive ? (
              <IconPlaceholder
                lucide="ArrowUpRightIcon"
                tabler="IconArrowUpRight"
                hugeicons="ArrowUpRight01Icon"
                phosphor="ArrowUpRightIcon"
                remixicon="RiArrowRightUpLine"
              />
            ) : (
              <IconPlaceholder
                lucide="ArrowDownRightIcon"
                tabler="IconArrowDownRight"
                hugeicons="ArrowDownRight01Icon"
                phosphor="ArrowDownRightIcon"
                remixicon="RiArrowRightDownLine"
              />
            )}
            {isPositive ? '+' : ''}
            {change}%
          </Badge>
        </CardAction>
      </CardHeader>
      {description ? <CardFooter>{description}</CardFooter> : null}
    </Card>
  );
}

export { StatCard };
