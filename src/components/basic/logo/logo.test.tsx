import { withProviders } from '@/utils/tests';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Logo } from './logo';

describe('Logo', () => {
  it('should have no accessibility violations', async () => {
    const { container, getByRole } = render(withProviders(<Logo />));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Logo />));
    expect(container).toMatchSnapshot();
  });
});
