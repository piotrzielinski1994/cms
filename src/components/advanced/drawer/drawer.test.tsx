import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { Drawer } from './drawer';

describe('Drawer', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
  } satisfies ComponentProps<typeof Drawer>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<Drawer {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Drawer {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
