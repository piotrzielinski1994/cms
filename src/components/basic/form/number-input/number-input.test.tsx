import { fireEvent, render, waitFor } from '@testing-library/react';
import { ComponentProps, useState } from 'react';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import Form from '../root/form';
import { NumberInput } from './number-input';

describe('NumberInput', () => {
  const defaultProps = {
    name: 'name',
    id: 'id',
    t: { increment: 'Increment', decrement: 'Decrement' },
  } satisfies ComponentProps<typeof NumberInput>;

  const ControlledInput = (props: ComponentProps<typeof NumberInput>) => {
    const [value, setValue] = useState<number | undefined>(undefined);
    return (
      <NumberInput
        {...props}
        value={value}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          setValue(isNaN(value) ? undefined : value);
        }}
      />
    );
  };

  it('should have no accessibility violations', async () => {
    const { container } = render(
      <Form.Group>
        <Form.Label htmlFor={defaultProps.id}>Label</Form.Label>
        <NumberInput {...defaultProps} />
      </Form.Group>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(<NumberInput {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  describe('Buttons', () => {
    it('should increase the value by step', async () => {
      const { getByLabelText, getByRole } = render(<ControlledInput {...defaultProps} step={10} />);
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      await waitFor(() => getByLabelText(defaultProps.t.increment).click());

      expect(valueBefore).toBe('');
      await waitFor(() => expect(input.value).toBe('10'));
    });

    it('should decrease the value by step', async () => {
      const { getByLabelText, getByRole } = render(<ControlledInput {...defaultProps} step={5} />);
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      await waitFor(() => getByLabelText(defaultProps.t.decrement).click());

      expect(valueBefore).toBe('');
      await waitFor(() => expect(input.value).toBe('-5'));
    });
  });

  describe('Keyboard', () => {
    it('should increase the value by step', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} step={10} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      await waitFor(() => expect(input.value).toBe('10'));
    });

    it('should decrease the value by step', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} step={5} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'ArrowDown' });

      await waitFor(() => expect(input.value).toBe('-5'));
    });
  });
});
