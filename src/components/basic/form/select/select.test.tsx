import { render } from '@testing-library/react';
import { ComponentProps } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { Select } from './select';

describe('Select', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    options: [1, 2, 3].map((it) => ({
      value: String(it),
      label: `Option ${it}`,
    })),
  } satisfies ComponentProps<typeof Select>;

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form.Group>
        <Form.Label htmlFor={defaultProps.id}>Label</Form.Label>
        <Select {...defaultProps} />
      </Form.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<Select {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
