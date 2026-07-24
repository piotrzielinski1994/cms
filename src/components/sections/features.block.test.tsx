import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { RenderBlocks } from './block';

// AC-009 / TC-015: a page section with blockType 'features' must route to the
// FeaturesContainer through the runtime block map, so the features band actually
// renders on a page (resolves to the container, not null).
describe('RenderBlocks features routing', () => {
  it('should render a features band when a section has blockType "features"', () => {
    const blocks = [
      {
        blockType: 'features',
        heading: 'Everything you need',
        items: [{ icon: 'zap', title: 'Quick', description: 'Ship quickly.' }],
      },
    ] as never;

    const { container, getByRole } = render(withProviders(<RenderBlocks blocks={blocks} />));

    // Resolving to FeaturesContainer (not null) renders the heading...
    expect(getByRole('heading', { level: 2, name: 'Everything you need' })).toBeInTheDocument();

    // ...and the single feature card with its icon, <h3> title and description.
    const articles = container.querySelectorAll('article');
    expect(articles).toHaveLength(1);
    expect(articles[0].querySelector('svg')).not.toBeNull();
    expect(articles[0].querySelector('h3')).toHaveTextContent('Quick');
    expect(articles[0]).toHaveTextContent('Ship quickly.');
  });
});
