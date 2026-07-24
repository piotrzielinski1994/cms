import { render, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { PaginationContainer } from './pagination.container';

const labels = en.frontend.component.pagination;

const containerProps = {
  currentPage: 5,
  totalPages: 10,
  getHref: (page: number) => `/products?page=${page}`,
} satisfies ComponentProps<typeof PaginationContainer>;

describe('PaginationContainer', () => {
  // TC-016b (AC-008): the container injects the frontend.component.pagination labels via useTranslations.
  it('should inject the frontend.component.pagination labels into nav, controls and ellipsis', () => {
    const { container } = render(withProviders(<PaginationContainer {...containerProps} />));
    const view = within(container);

    expect(view.getByRole('navigation', { name: labels.label })).toBeInTheDocument();
    expect(view.getByRole('link', { name: labels.previous })).toBeInTheDocument();
    expect(view.getByRole('link', { name: labels.next })).toBeInTheDocument();
    expect(container.querySelector('.sr-only')?.textContent).toBe(labels.morePages);
  });
});
