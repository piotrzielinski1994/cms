import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { THUMBNAIL_ID } from '@/config/storybook/utils';
import { withProviders } from '@/utils/tests';
import meta, { Content as ContentStory } from './content.stories';

// AC-011 / TC-015: the story is titled `Sections/Content`, seeds default args,
// and renders through next-intl translations (fields + common), tagging the
// root with THUMBNAIL_ID. We render its `render` fn through the providers
// (which supply the i18n messages) to prove those EXISTING keys resolve (no new
// STORY keys added).
describe('Content story', () => {
  it('should be titled "Sections/Content"', () => {
    expect(meta.title).toBe('Sections/Content');
  });

  it('should seed default args for heading, subheading and content', () => {
    expect(meta.args?.heading).toBeDefined();
    expect(meta.args?.subheading).toBeDefined();
    expect(meta.args?.content).toBeDefined();
  });

  it('should render the story with resolved translation copy and the thumbnail id, without leaking the fallback sentinel', () => {
    const Render = ContentStory.render as ComponentType<Record<string, unknown>>;
    const { getByRole, container } = render(withProviders(<Render {...(meta.args ?? {})} />));

    // Renders the content band with a heading and some prose body copy.
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect((container.textContent ?? '').trim().length).toBeGreaterThan(0);

    // The story tags the root section with THUMBNAIL_ID (used by thumbnail capture).
    expect(container.querySelector(`#${THUMBNAIL_ID}`)).not.toBeNull();

    // Fallback sentinel must be replaced by real translation copy, never leaked.
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
