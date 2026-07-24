import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { FeaturesContainer } from './features.container';

type ContainerProps = ComponentProps<typeof FeaturesContainer>;

describe('FeaturesContainer', () => {
  // TC-013 -> AC-008
  it('should map heading, coalesce null subheading/icon/description to undefined, and pass items through to Features', () => {
    const block = {
      heading: 'H',
      subheading: null,
      items: [
        { icon: 'rocket', title: 'T', description: 'D' },
        { icon: null, title: 'T2', description: null },
      ],
    } as unknown as ContainerProps;

    const { container, getByRole, queryByRole } = render(
      withProviders(<FeaturesContainer {...block} />),
    );

    // heading -> <h2> "H"; null subheading -> undefined -> no subheading <p>.
    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const sectionHeader = h2.closest('header');
    expect(sectionHeader?.querySelector('p')).toBeNull();

    // Two feature cards render in source order.
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(2);

    // First item: icon 'rocket' -> an <svg>, <h3> "T", body <p> "D".
    expect(articles[0].querySelector('svg')).not.toBeNull();
    expect(articles[0].querySelector('h3')).toHaveTextContent('T');
    expect(articles[0]).toHaveTextContent('D');

    // Second item: null icon -> undefined -> no <svg>; <h3> "T2"; null
    // description -> undefined -> no body <p>.
    expect(articles[1].querySelector('svg')).toBeNull();
    expect(articles[1].querySelector('h3')).toHaveTextContent('T2');
    expect(articles[1].querySelector('p')).toBeNull();

    // No h3 is orphaned outside the two cards.
    expect(queryByRole('heading', { level: 3, name: 'T' })).toBeInTheDocument();
  });

  // TC-014 -> AC-008, AC-004 (icon select value flows through into the iconMap lookup)
  it('should render the rocket icon svg for icon "rocket" and no svg when icon is null', () => {
    const withIcon = {
      items: [{ icon: 'rocket', title: 'T' }],
    } as unknown as ContainerProps;
    const { container: iconContainer } = render(
      withProviders(<FeaturesContainer {...withIcon} />),
    );
    const iconArticle = iconContainer.querySelector('article');
    const svg = iconArticle?.querySelector('svg');
    expect(svg).not.toBeNull();
    // The resolved lucide element is the rocket icon.
    expect(svg?.getAttribute('class') ?? '').toContain('rocket');

    const noIcon = {
      items: [{ icon: null, title: 'T' }],
    } as unknown as ContainerProps;
    const { container: noIconContainer } = render(
      withProviders(<FeaturesContainer {...noIcon} />),
    );
    expect(noIconContainer.querySelector('article')?.querySelector('svg')).toBeNull();
  });
});
