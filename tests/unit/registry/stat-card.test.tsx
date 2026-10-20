import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { StatCard } from '@/registry/shared/stat-card/stat-card';

describe('StatCard', () => {
  it('shows the title, value and a positive change', () => {
    render(<StatCard title="Revenue" value="$12,400" change={8.5} description="vs last month" />);

    expect(screen.getByText('Revenue')).toBeDefined();
    expect(screen.getByText('$12,400')).toBeDefined();
    expect(screen.getByText('+8.5%')).toBeDefined();
    expect(screen.getByText('vs last month')).toBeDefined();
  });

  it('shows a negative change without a plus sign', () => {
    render(<StatCard title="Churn" value="3%" change={-1.2} />);

    expect(screen.getByText('-1.2%')).toBeDefined();
    expect(screen.queryByText('+-1.2%')).toBeNull();
  });
});
