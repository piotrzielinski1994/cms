import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { withProviders } from '@/utils/tests';
import meta, { Carousel as CarouselStory } from './carousel.stories';

describe('Carousel story', () => {
  // TC-017 (AC-013): the story is titled Advanced/Carousel.
  it('should be titled "Advanced/Carousel"', () => {
    expect(meta.title).toBe('Advanced/Carousel');
  });

  // TC-017 (AC-013): the story renders a multi-slide carousel region under withProviders.
  it('should render a multi-slide carousel region', () => {
    const Render = CarouselStory.render as ComponentType<Record<string, unknown>>;
    const { container } = render(withProviders(<Render {...(meta.args ?? {})} />));

    const region = container.querySelector('[aria-roledescription="carousel"]');
    expect(region).not.toBeNull();
    expect(region?.querySelectorAll('[aria-roledescription="slide"]').length).toBeGreaterThan(1);
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
