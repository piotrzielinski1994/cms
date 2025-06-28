import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Header } from './header';

describe('Header', () => {
  const defaultProps = {
    items: [
      { id: 'home', label: 'Home', href: '/' },
      { id: 'about', label: 'About', href: '/about' },
      { id: 'contact', label: 'Contact', href: '/contact' },
    ],
  } satisfies ComponentProps<typeof Header>;

  it('should have no accessibility violations', async () => {
    const { container } = await waitFor(() => render(withProviders(<Header {...defaultProps} />)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
