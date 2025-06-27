import { placeholderWebp } from '@/placeholders';
import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { ImageBlock1 } from './image-block-1';

describe('ImageBlock1', () => {
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
      src: placeholderWebp.src,
      alt: 'Image',
      width: placeholderWebp.width,
      height: placeholderWebp.height,
    },
  } satisfies ComponentProps<typeof ImageBlock1>;

  it('should have no accessibility violations', async () => {
    const { container } = await waitFor(() =>
      render(withProviders()(<ImageBlock1 {...defaultProps} />)),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders()(<ImageBlock1 {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });
});
