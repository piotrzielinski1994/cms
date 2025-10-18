import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import { TextInput } from './text-input';

describe('TextInput', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    label: 'Label',
    value: 'value',
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof TextInput>;

  it('should have no accessibility violations', async () => {
    const { container } = render(<TextInput {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<TextInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
