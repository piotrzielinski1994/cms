import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { THUMBNAIL_ID } from '@/config/storybook/utils';
import { withProviders } from '@/utils/tests';
import meta, { Features as FeaturesStory } from './features.stories';

// AC-011 / TC-016: the story is titled `Sections/Features`, seeds default args,
// and renders through next-intl `fields` translations, tagging the root with
// THUMBNAIL_ID. We render its `render` fn through the providers (which supply
// the i18n messages) to prove those existing keys resolve (no new STORY keys).
describe('Features story', () => {
  it('should be titled "Sections/Features"', () => {
    expect(meta.title).toBe('Sections/Features');
  });

  it('should seed default args for heading, subheading and items', () => {
    expect(meta.args?.heading).toBeDefined();
    expect(meta.args?.subheading).toBeDefined();
    expect(Array.isArray(meta.args?.items)).toBe(true);
    expect((meta.args?.items ?? []).length).toBeGreaterThan(0);
  });

  it('should seed items with concrete curated icon values', () => {
    const icons = (meta.args?.items ?? []).map((it) => it.icon);
    // Every seeded item carries a concrete (defined) icon value.
    expect(icons.every((icon) => typeof icon === 'string' && icon.length > 0)).toBe(true);
  });

  it('should render the story with resolved translation copy, feature cards, and the thumbnail id', () => {
    const Render = FeaturesStory.render as ComponentType<Record<string, unknown>>;
    const { getByRole, container } = render(withProviders(<Render {...(meta.args ?? {})} />));

    // Renders the features band with a heading and at least one feature card.
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    const articles = container.querySelectorAll('article');
    expect(articles.length).toBeGreaterThan(0);
    // At least one seeded icon resolved to an <svg>.
    expect(container.querySelector('article svg')).not.toBeNull();

    // The story tags the root section with THUMBNAIL_ID (used by thumbnail capture).
    expect(container.querySelector(`#${THUMBNAIL_ID}`)).not.toBeNull();

    // Fallback sentinel must be replaced by real translation copy, never leaked.
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
