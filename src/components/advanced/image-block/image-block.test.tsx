import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ImageBlock } from './image-block';

describe('ImageBlock', () => {
  const defaultProps = {
    heading: 'Heading',
    subheading: 'Subheading',
    buttons: [
      {
        label: 'Primary Button',
        href: '/primary',
      },
      {
        variant: 'secondary',
        label: 'Secondary Button',
        href: '/secondary',
      },
    ],
    image: {
      src: '/images/placeholder.webp',
      alt: 'Image',
      width: 1920,
      height: 1080,
    },
  } satisfies ComponentProps<typeof ImageBlock>;

  it('should have no accessibility violations', async () => {
    const { container } = await waitFor(() =>
      render(withProviders(<ImageBlock {...defaultProps} />)),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  return;
  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<ImageBlock {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
