import { resolveServerComponent, withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Footer } from './footer';

vi.mock('@/payload/utils/globals', () => ({
  getCachedGlobal: vi.fn().mockReturnValue(
    vi.fn().mockResolvedValue({
      navItems: [
        { id: '1', link: { label: 'Home', reference: { value: { path: '/' } } } },
        { id: '2', link: { label: 'About', reference: { value: { path: '/about' } } } },
      ],
    }),
  ),
}));

describe('Footer', () => {
  it('should have no accessibility violations', async () => {
    const ServerFooter = await resolveServerComponent(Footer, { locale: 'en' });
    const { container } = await waitFor(() => render(withProviders(<ServerFooter />)));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const ServerFooter = await resolveServerComponent(Footer, { locale: 'en' });
    const { container } = render(withProviders(<ServerFooter />));
    expect(container).toMatchSnapshot();
  });
});
