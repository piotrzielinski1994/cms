import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Button, ButtonLink } from './button';

describe('Button', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(<Button disabled>Button</Button>);
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(<Button onClick={onClick}>Button</Button>);

    await userEvent.click(getByRole('button', { name: 'Button' }));

    expect(onClick).toHaveBeenCalled();
  });
});

describe('ButtonLink', () => {
  it('renders with default primary variant classes', () => {
    const { getByRole } = render(withProviders()(<ButtonLink href="/test">ButtonLink</ButtonLink>));
    const link = getByRole('link');
    expect(link.className).toContain('bg-primary');
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(withProviders()(<ButtonLink href="/test">ButtonLink</ButtonLink>));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', () => {
    const { container } = render(withProviders()(<ButtonLink href="/test">ButtonLink</ButtonLink>));
    expect(container).toMatchSnapshot();
  });

  it('calls onClick handler', async () => {
    const onClick = vi.fn();
    const { getByRole } = render(
      withProviders()(
        <ButtonLink href="/test" onClick={onClick}>
          ButtonLink
        </ButtonLink>,
      ),
    );

    await userEvent.click(getByRole('link', { name: 'ButtonLink' }));

    expect(onClick).toHaveBeenCalled();
  });
});
