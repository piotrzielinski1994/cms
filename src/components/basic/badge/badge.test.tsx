import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Badge } from './badge';

describe('Badge', () => {
  const defaultProps = {
    bgColor: '#000',
    textColor: '#fff',
    children: 'Label',
  } satisfies ComponentProps<typeof Badge>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Badge {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Badge {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
