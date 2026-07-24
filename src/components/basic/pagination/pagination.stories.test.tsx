import { render } from '@testing-library/react';
import type { ComponentType } from 'react';
import { describe, expect, it } from 'vitest';
import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import meta, { Pagination as PaginationStory } from './pagination.stories';

const morePages = en.frontend.component.pagination.morePages;

describe('Pagination story', () => {
  // TC-017 (AC-012): the story is titled Basic/Pagination.
  it('should be titled "Basic/Pagination"', () => {
    expect(meta.title).toBe('Basic/Pagination');
  });

  // TC-017 (AC-012): the story demonstrates a few-page (no ellipsis) and a many-page (both-ellipsis) case.
  it('should render a few-page case and a many-page case with ellipses', () => {
    const Render = PaginationStory.render as ComponentType<Record<string, unknown>>;
    const { container } = render(withProviders(<Render {...(meta.args ?? {})} />));

    // At least two pagination navs: the few-page demo and the many-page demo.
    const navs = container.querySelectorAll('nav');
    expect(navs.length).toBeGreaterThanOrEqual(2);

    // The many-page demo produces at least one truncating ellipsis.
    const ellipses = [...container.querySelectorAll('.sr-only')].filter(
      (el) => el.textContent === morePages,
    );
    expect(ellipses.length).toBeGreaterThanOrEqual(1);

    // Real translation copy, never the fallback sentinel.
    expect(container.textContent ?? '').not.toContain('__default__');
  });
});
