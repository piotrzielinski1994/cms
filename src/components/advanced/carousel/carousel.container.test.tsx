import { render, within } from '@testing-library/react';
import type { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { en } from '@/payload/locale/en';
import { withProviders } from '@/utils/tests';
import { CarouselContainer } from './carousel.container';

const labels = en.frontend.component.carousel;

const containerProps = {
  slides: ['Body 1', 'Body 2', 'Body 3'],
} satisfies ComponentProps<typeof CarouselContainer>;

describe('CarouselContainer', () => {
  // TC-014 (AC-011): the container injects the frontend.component.carousel labels via useTranslations.
  it('should inject the frontend.component.carousel labels into the region and controls', () => {
    const { container } = render(withProviders(<CarouselContainer {...containerProps} />));
    const view = within(container);

    expect(view.getByRole('region', { name: labels.label })).toBeInTheDocument();
    expect(view.getByRole('button', { name: labels.previous })).toBeInTheDocument();
    expect(view.getByRole('button', { name: labels.next })).toBeInTheDocument();
  });

  // TC-014 (AC-011, AC-012): the injected slide label uses the ICU-parameterised locale string.
  it('should build the slide accessible name from the carousel.slide ICU message', () => {
    const { container } = render(withProviders(<CarouselContainer {...containerProps} />));
    const slide = container.querySelector('[aria-roledescription="slide"]');
    expect(slide).toHaveAttribute(
      'aria-label',
      labels.slide.replace('{n}', '1').replace('{total}', '3'),
    );
  });
});
