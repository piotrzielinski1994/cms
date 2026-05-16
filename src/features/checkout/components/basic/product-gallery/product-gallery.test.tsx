import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ProductGallery } from './product-gallery';

describe('ProductGallery', () => {
  const defaultProps = {
    images: [1, 2, 3].map((it) => ({
      src: `/image-${it}.webp`,
      alt: `Image ${it}`,
    })),
  } satisfies ComponentProps<typeof ProductGallery>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<ProductGallery {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<ProductGallery {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
