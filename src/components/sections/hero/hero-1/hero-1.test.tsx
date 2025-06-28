import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Hero1 } from './hero-1';

describe('Hero1', () => {
  const defaultProps = {
    heading: 'Heading',
    subheading: 'Subheading',
    buttons: [
      { label: 'Button 1', href: '/path-1', variant: 'primary' },
      { label: 'Button 2', href: '/path-2', variant: 'secondary' },
    ],
  } satisfies ComponentProps<typeof Hero1>;

  it('should have no accessibility violations', async () => {
    const { container } = await waitFor(() => render(withProviders(<Hero1 {...defaultProps} />)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Hero1 {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
