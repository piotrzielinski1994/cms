import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { Radio } from './radio';

describe('Radio', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    label: 'Label',
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof Radio>;

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form.Group>
        <Form.Label htmlFor={defaultProps.id}>Label</Form.Label>
        <Radio {...defaultProps} />
      </Form.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Radio {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
