import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { TextArea } from './text-area';

describe('TextArea', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    label: 'Label',
    value: 'value',
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof TextArea>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<TextArea {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<TextArea {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
