import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { RenderBlocks } from './block';

// A minimal, valid Lexical editor state (paragraph + text node) so the routed
// container's <RichText> serializes real prose.
const lexicalRoot = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [
          { type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
    version: 1,
  },
});

// AC-009 / TC-014: a page section with blockType 'content' must route to the
// ContentContainer through the runtime block map, so the content band actually
// renders on a page (resolves to the container, not null).
describe('RenderBlocks content routing', () => {
  it('should render a content band when a section has blockType "content"', () => {
    const blocks = [
      {
        blockType: 'content',
        heading: 'H',
        content: lexicalRoot('Body'),
      },
    ] as never;

    const { container, getByRole } = render(withProviders(<RenderBlocks blocks={blocks} />));

    // Resolving to ContentContainer (not null) renders the heading...
    expect(getByRole('heading', { level: 2, name: 'H' })).toBeInTheDocument();

    // ...and the serialized prose body.
    expect(container).toHaveTextContent('Body');
    // No Card surface (content band places prose directly in the Container).
    expect(container.querySelectorAll('article')).toHaveLength(0);
  });
});
