import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { RenderBlocks } from './block';

// AC-009 / TC-010: a page section with blockType 'cta' must route to the CTA
// container through the runtime block map, so the CTA actually renders on a page.
describe('RenderBlocks cta routing', () => {
  it('should render a CTA band when a section has blockType "cta"', () => {
    const blocks = [
      {
        blockType: 'cta',
        heading: 'Ready?',
        subheading: 'Start today',
        buttons: [{ label: 'Go', reference: { relationTo: 'pages', value: { path: '/go' } } }],
      },
    ] as never;

    const { getByRole } = render(withProviders(<RenderBlocks blocks={blocks} />));

    // Resolving to CtaContainer (not null) produces the Card <article> surface
    // with the heading and the button link.
    const article = getByRole('article');
    expect(getByRole('heading', { level: 2, name: 'Ready?' })).toBeInTheDocument();
    expect(article).toHaveTextContent('Start today');
    const link = getByRole('link', { name: 'Go' });
    expect(link).toHaveAttribute('href', '/go');
  });
});
