import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { TestimonialsContainer } from './testimonials.container';

type ContainerProps = ComponentProps<typeof TestimonialsContainer>;

describe('TestimonialsContainer', () => {
  // TC-011 -> AC-008
  it('should map heading, coalesce null subheading to undefined, and resolve each item image url onto Testimonials', () => {
    const block = {
      heading: 'H',
      subheading: null,
      items: [
        { image: { url: '/x.webp' }, quote: 'Q', name: 'N', annotation: 'R' },
        { image: { url: '/y.webp' }, quote: 'Q2', name: 'N2', annotation: null },
      ],
    } as unknown as ContainerProps;

    const { container, getByRole, queryByRole } = render(
      withProviders(<TestimonialsContainer {...block} />),
    );

    // heading -> <h2> "H"; null subheading -> undefined -> no subheading <p>.
    const header = container.querySelector('header');
    expect(header).toContainElement(getByRole('heading', { level: 2, name: 'H' }));
    expect(header?.querySelector('p')).toBeNull();
    expect(queryByRole('heading', { level: 3 })).toBeNull();

    // Two figures render in source order.
    const figures = container.querySelectorAll('figure');
    expect(figures).toHaveLength(2);

    // First item: quote Q, name N, annotation R -> two figcaption spans.
    expect(figures[0]).toHaveTextContent('Q');
    expect(figures[0]).toHaveTextContent('N');
    expect(figures[0]).toHaveTextContent('R');
    expect(figures[0].querySelectorAll('figcaption span')).toHaveLength(2);
    // Image url resolved from item.image.url onto the avatar's next/image src.
    expect(figures[0].querySelector('img')?.getAttribute('src') ?? '').toContain(
      encodeURIComponent('/x.webp'),
    );

    // Second item: quote Q2, name N2, null annotation -> undefined -> one span only.
    expect(figures[1]).toHaveTextContent('Q2');
    expect(figures[1]).toHaveTextContent('N2');
    expect(figures[1].querySelectorAll('figcaption span')).toHaveLength(1);
    expect(figures[1].querySelector('img')?.getAttribute('src') ?? '').toContain(
      encodeURIComponent('/y.webp'),
    );
  });

  // TC-012 -> AC-008
  it('should fall back to an empty image src (never throw) when an item image object has no url', () => {
    const block = {
      heading: null,
      subheading: null,
      items: [{ image: {}, quote: 'Q', name: 'N' }],
    } as unknown as ContainerProps;

    const renderNoUrl = () => render(withProviders(<TestimonialsContainer {...block} />));
    expect(renderNoUrl).not.toThrow();

    const { container } = renderNoUrl();

    // The figure still renders with its name, and an <img> is emitted with no
    // resolved next/image src (the '' fallback yields no meaningful src attr).
    const figure = container.querySelector('figure');
    expect(figure).not.toBeNull();
    expect(figure).toHaveTextContent('N');
    const img = figure?.querySelector('img');
    expect(img).not.toBeNull();
    expect(img?.getAttribute('src') ?? '').not.toContain('_next/image');
  });
});
