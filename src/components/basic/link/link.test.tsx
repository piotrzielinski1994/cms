import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Link } from './link';

describe('Link', () => {
  const defaultProps = {
    href: '/test',
    children: 'Link',
  } satisfies ComponentProps<typeof Link>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<Link {...defaultProps} />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(withProviders(<Link {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(withProviders(<Link {...defaultProps} onClick={onClick} />));

    await userEvent.click(getByRole('link', { name: defaultProps.children }));

    expect(onClick).toHaveBeenCalled();
  });
});
