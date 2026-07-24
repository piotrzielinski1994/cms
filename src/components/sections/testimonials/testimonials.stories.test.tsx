import { render } from '@testing-library/react';
import type { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';
import { storyToUrlPath, THUMBNAIL_ID } from '@/config/storybook/utils';
import { withProviders } from '@/utils/tests';
import meta, { Testimonials as TestimonialsStory } from './testimonials.stories';

// AC-011 / TC-014: the story is titled `Sections/Testimonials`, seeds default
// args, and renders through next-intl translations (fields +
// storybook.advanced.testimonial), tagging the root with THUMBNAIL_ID. We
// render its `render` fn through the providers (which supply the i18n messages)
// to prove those keys resolve without leaking the fallback sentinel.

// The story's Render reads a theme-aware avatar from context.globals.theme, so
// we invoke it via a wrapper that supplies a fixed context while React runs the
// hooks inside Render during the wrapper's own render phase (mirroring how
// Storybook itself calls `render(args, context)`).
type StoryRender = (args: Record<string, unknown>, context: unknown) => ReactElement;
const renderStory = (args: Record<string, unknown>) => {
  const Render = TestimonialsStory.render as StoryRender;
  const Wrapper = (props: Record<string, unknown>) =>
    Render(props, { globals: { theme: 'light' } });
  return render(withProviders(<Wrapper {...args} />));
};

describe('Testimonials story', () => {
  it('should be titled "Sections/Testimonials"', () => {
    expect(meta.title).toBe('Sections/Testimonials');
  });

  it('should be collected as "sections-testimonials--testimonials" by the storybook glob', () => {
    expect(storyToUrlPath(meta.title ?? '')).toBe('sections-testimonials--testimonials');
  });

  it('should seed default args for heading, subheading and a non-empty items array', () => {
    expect(meta.args?.heading).toBeDefined();
    expect(meta.args?.subheading).toBeDefined();
    expect(Array.isArray(meta.args?.items)).toBe(true);
    expect((meta.args?.items ?? []).length).toBeGreaterThan(0);
  });

  it('should render the story with resolved translation copy and the thumbnail id', () => {
    const { container, getByRole } = renderStory(meta.args ?? {});

    // Renders the testimonials band with a heading and at least one figure.
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(container.querySelectorAll('figure').length).toBeGreaterThan(0);

    // The story tags the root section with THUMBNAIL_ID (used by thumbnail capture).
    expect(container.querySelector(`#${THUMBNAIL_ID}`)).not.toBeNull();

    // Fallback sentinel must be replaced by real translation copy, never leaked.
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
