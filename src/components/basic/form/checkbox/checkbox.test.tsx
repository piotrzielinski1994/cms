import { render } from '@testing-library/react';
import { ComponentProps, useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { Checkbox } from './checkbox';

describe('Checkbox', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    label: 'Label',
    onChange: vi.fn(),
  } satisfies ComponentProps<typeof Checkbox>;

  const ControlledComponent = (props: ComponentProps<typeof Checkbox>) => {
    const [isChecked, setIsChecked] = useState<boolean>(props.checked ?? false);
    return (
      <Form.Group>
        <Form.Label htmlFor={props.id}>Label</Form.Label>
        <Checkbox
          {...props}
          checked={isChecked}
          onChange={(e) => setIsChecked(e.currentTarget.checked)}
        />
      </Form.Group>
    );
  };

  it('should have no accessibility violations', async () => {
    const { container } = render(<ControlledComponent {...defaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<ControlledComponent {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
});
