import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Button, ButtonLink } from './button';

describe('Button', () => {
  const defaultProps = {
    onClick: vi.fn(),
    children: 'Button',
  } satisfies ComponentProps<typeof Button>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<Button {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Button {...defaultProps} disabled />);
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler', async () => {
    const { getByRole } = render(<Button {...defaultProps} />);

    await userEvent.click(getByRole('button', { name: defaultProps.children }));

    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});

describe('ButtonLink', () => {
  const defaultProps = {
    href: '/test',
    children: 'ButtonLink',
  } satisfies ComponentProps<typeof ButtonLink>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders with default primary variant classes', () => {
    const { getByRole } = render(withProviders(<ButtonLink {...defaultProps} />));
    const link = getByRole('link');
    expect(link.className).toContain('bg-primary');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders(<ButtonLink {...defaultProps} />));
    const results = await waitFor(() => axe(container));
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(withProviders(<ButtonLink {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler', async () => {
    const onClick = vi.fn((e) => e.preventDefault());
    const { getByRole } = render(withProviders(<ButtonLink {...defaultProps} onClick={onClick} />));

    await userEvent.click(getByRole('link', { name: defaultProps.children }));

    expect(onClick).toHaveBeenCalled();
  });
});
