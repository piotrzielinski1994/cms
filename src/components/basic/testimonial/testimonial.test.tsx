import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Testimonial } from './testimonial';

describe('Testimonial', () => {
  const defaultProps = {
    image: '/testimonial.webp',
    quote: 'Quote',
    name: 'Name',
    annotation: 'Annotation',
  } satisfies ComponentProps<typeof Testimonial>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Testimonial {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Testimonial {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
