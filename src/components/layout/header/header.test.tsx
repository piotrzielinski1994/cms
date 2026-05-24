import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { ComponentProps, ReactNode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Header } from './header';

const cartState: { items: Array<{ quantity: number }>; subtotal: number } = {
  items: [],
  subtotal: 0,
};

vi.mock('@payloadcms/plugin-ecommerce/client/react', () => ({
  useCart: () => ({ cart: cartState, removeItem: vi.fn() }),
  EcommerceProvider: ({ children }: { children: ReactNode }) => children,
}));

vi.mock('@payloadcms/plugin-ecommerce/payments/stripe', () => ({
  stripeAdapterClient: () => ({}),
}));

beforeEach(() => {
  cartState.items = [];
  cartState.subtotal = 0;
});

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

  it('should render cart button as last li of nav (AC-001, AC-004)', () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    const navItems = container.querySelectorAll('header nav > ul > li');
    expect(navItems.length).toBe(defaultProps.items.length + 1);
    const lastLi = navItems[navItems.length - 1];
    const cartButton = lastLi?.querySelector('button[aria-label]');
    expect(cartButton).not.toBeNull();
    expect(cartButton?.querySelector('svg')).not.toBeNull();
  });

  it('should not render cart button outside header (AC-002)', () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    const allButtonsWithCartIcon = container.querySelectorAll('button svg.lucide-shopping-cart');
    allButtonsWithCartIcon.forEach((svg) => {
      const button = svg.closest('button');
      expect(button?.closest('header')).not.toBeNull();
    });
  });

  it('should render quantity badge if cart has items (AC-006)', () => {
    cartState.items = [{ quantity: 2 }, { quantity: 3 }];
    const { container } = render(withProviders(<Header {...defaultProps} />));
    const cartButton = container.querySelector('header nav button[aria-label]');
    const badge = cartButton?.querySelector('span');
    expect(badge).not.toBeNull();
    expect(badge?.textContent).toBe('5');
  });

  it('should not render badge if cart is empty (AC-006)', () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    const cartButton = container.querySelector('header nav button[aria-label]');
    const badge = cartButton?.querySelector('span');
    expect(badge).toBeNull();
  });

  it('should not apply responsive hiding to cart button (AC-008)', () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    const cartButton = container.querySelector('header nav button[aria-label]');
    const cls = cartButton?.className ?? '';
    expect(cls).not.toMatch(/\b(hidden|sm:hidden|md:hidden|lg:hidden)\b/);
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<Header {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
