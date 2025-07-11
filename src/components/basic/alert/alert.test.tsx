import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { Alert } from './alert';

describe('Alert', () => {
  const defaultProps = {
    type: 'info',
    children: 'Text',
  } satisfies ComponentProps<typeof Alert>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Alert {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Alert {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
