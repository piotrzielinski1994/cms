import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { CtaContainer } from './cta.container';

type CtaContainerProps = ComponentProps<typeof CtaContainer>;

// A page reference whose resolved document exposes a `path`.
const ref = (path: string) => ({ relationTo: 'pages' as const, value: { path } });

describe('CtaContainer', () => {
  // TC-009 -> AC-008
  it('should map heading, subheading and buttons (href from reference path, first primary rest secondary) onto Cta', () => {
    const block = {
      heading: 'H',
      subheading: 'S',
      buttons: [
        { label: 'A', reference: ref('/x') },
        { label: 'B', reference: ref('/y') },
      ],
    } as unknown as CtaContainerProps;

    const { getByRole, getAllByRole } = render(withProviders(<CtaContainer {...block} />));

    // heading -> <h2>, subheading -> body text.
    expect(getByRole('heading', { level: 2, name: 'H' })).toBeInTheDocument();
    expect(getByRole('article')).toHaveTextContent('S');

    // Each button resolves href from `reference.value.path`, in order.
    const links = getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent('A');
    expect(links[0]).toHaveAttribute('href', '/x');
    expect(links[1]).toHaveTextContent('B');
    expect(links[1]).toHaveAttribute('href', '/y');

    // First button gets the primary variant, the rest secondary.
    expect(links[0].classList.contains('bg-primary')).toBe(true);
    expect(links[1].classList.contains('bg-primary')).toBe(false);
    expect(links[1].classList.contains('bg-background')).toBe(true);
  });

  // TC-009 (null coalescing) -> AC-008
  it('should coalesce null heading and subheading to undefined so neither the h2 nor the body paragraph render', () => {
    const block = {
      heading: null,
      subheading: null,
      buttons: [],
    } as unknown as CtaContainerProps;

    const { getByRole, queryByRole } = render(withProviders(<CtaContainer {...block} />));

    const article = getByRole('article');
    expect(queryByRole('heading', { level: 2 })).toBeNull();
    expect(article.querySelector('header')).toBeNull();
    expect(article.querySelector('p')).toBeNull();
    expect(queryByRole('link')).toBeNull();
  });

  // TC-009 (href fallback) -> AC-008
  it('should fall back to an empty href when the referenced page has no path', () => {
    const block = {
      heading: 'H',
      buttons: [{ label: 'A', reference: { relationTo: 'pages', value: {} } }],
    } as unknown as CtaContainerProps;

    const { getByText } = render(withProviders(<CtaContainer {...block} />));

    // An <a href=""> carries no `link` ARIA role, so query it by its label text.
    expect(getByText('A')).toHaveAttribute('href', '');
  });
});
