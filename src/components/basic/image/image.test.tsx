import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Image } from './image';

describe('Image', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Image src="/image.webp" alt="Label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Image src="/image.webp" alt="Label" />);
    expect(container).toMatchSnapshot();
  });
});
