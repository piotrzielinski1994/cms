import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { THUMBNAIL_ID } from '@/config/storybook/utils';
import { withProviders } from '@/utils/tests';
import meta, { Cta as CtaStory } from './cta.stories';

// AC-011 / TC-011: the story is titled `Sections/Cta`, seeds default args, and
// renders through next-intl translations (fields + storybook.basic.button),
// tagging the root with THUMBNAIL_ID. We render its `render` fn through the
// providers (which supply the i18n messages) to prove those keys resolve.
describe('Cta story', () => {
  it('should be titled "Sections/Cta"', () => {
    expect(meta.title).toBe('Sections/Cta');
  });

  it('should seed default args for heading, subheading and buttons', () => {
    expect(meta.args?.heading).toBeDefined();
    expect(meta.args?.subheading).toBeDefined();
    expect(Array.isArray(meta.args?.buttons)).toBe(true);
    expect((meta.args?.buttons ?? []).length).toBeGreaterThan(0);
  });

  it('should render the story with resolved translation copy and the thumbnail id', () => {
    const Render = CtaStory.render as ComponentType<Record<string, unknown>>;
    const { getByRole, container } = render(withProviders(<Render {...(meta.args ?? {})} />));

    // Renders the CTA band (Card article) with a heading and at least one button link.
    const article = getByRole('article');
    expect(article).toBeInTheDocument();
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(container.querySelectorAll('a').length).toBeGreaterThan(0);

    // The story tags the root section with THUMBNAIL_ID (used by thumbnail capture).
    expect(container.querySelector(`#${THUMBNAIL_ID}`)).not.toBeNull();

    // Fallback sentinel must be replaced by real translation copy, never leaked.
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
