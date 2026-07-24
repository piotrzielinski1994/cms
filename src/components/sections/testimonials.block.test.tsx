import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { RenderBlocks } from './block';

// AC-009 / TC-013: a page section with blockType 'testimonials' must route to
// the TestimonialsContainer through the runtime block map, so the testimonials
// band actually renders on a page (resolves to the container, not null).
describe('RenderBlocks testimonials routing', () => {
  it('should render a testimonials band when a section has blockType "testimonials"', () => {
    const blocks = [
      {
        blockType: 'testimonials',
        heading: 'What our customers say',
        items: [
          { image: { url: '/a.webp' }, quote: 'Q1', name: 'Ann', annotation: 'CEO' },
          { image: { url: '/b.webp' }, quote: 'Q2', name: 'Bob' },
        ],
      },
    ] as never;

    const { container, getByRole } = render(withProviders(<RenderBlocks blocks={blocks} />));

    // Resolving to TestimonialsContainer (not null) renders the heading...
    expect(getByRole('heading', { level: 2, name: 'What our customers say' })).toBeInTheDocument();

    // ...and the two Testimonial figures with their quotes and names.
    const figures = container.querySelectorAll('figure');
    expect(figures).toHaveLength(2);
    expect(figures[0]).toHaveTextContent('Q1');
    expect(figures[0]).toHaveTextContent('Ann');
    expect(figures[1]).toHaveTextContent('Q2');
    expect(figures[1]).toHaveTextContent('Bob');
  });
});
