import { render } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import { ContentContainer } from './content.container';

type ContainerProps = ComponentProps<typeof ContentContainer>;

// A minimal, valid Lexical editor state: a single paragraph containing one text
// node. Mirrors the `FAQ.items[].answer` root object shape and satisfies the
// serializer's `hasText` check, so `<RichText>` renders real text.
const lexicalRoot = (text: string) => ({
  root: {
    type: 'root',
    children: [
      {
        type: 'paragraph',
        version: 1,
        children: [{ type: 'text', version: 1, text, format: 0, detail: 0, mode: 'normal', style: '' }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
      },
    ],
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
});

describe('ContentContainer', () => {
  // TC-012 -> AC-008
  it('should pass heading through and coalesce a null subheading to undefined so the h2 renders but no subheading paragraph does', () => {
    const block = {
      heading: 'H',
      subheading: null,
      content: lexicalRoot('Body copy'),
    } as unknown as ContainerProps;

    const { container, getByRole } = render(withProviders(<ContentContainer {...block} />));

    // heading -> <h2> "H".
    const h2 = getByRole('heading', { level: 2, name: 'H' });
    const header = h2.closest('header');
    expect(header).not.toBeNull();

    // null subheading -> undefined -> no subheading <p> in the header.
    expect(header?.querySelector('p')).toBeNull();

    // The serialized content still renders (proves content flowed through).
    expect(container).toHaveTextContent('Body copy');
  });

  // TC-013 -> AC-008, AC-004
  it('should serialize the content richText field via RichText so its paragraph text renders inside the prose region', () => {
    const block = {
      heading: null,
      subheading: null,
      content: lexicalRoot('Hello prose'),
    } as unknown as ContainerProps;

    const { container } = render(withProviders(<ContentContainer {...block} />));

    // The Lexical paragraph text is serialized to a <p> inside the Container,
    // proving the richText field flows through <RichText data={content} /> into
    // the Content component (mirroring how FaqContainer serializes `answer`).
    const containerEl = container.querySelector('.cms-container');
    expect(containerEl).not.toBeNull();
    expect(containerEl).toHaveTextContent('Hello prose');
    expect(container.querySelector('p')).toHaveTextContent('Hello prose');
  });
});
