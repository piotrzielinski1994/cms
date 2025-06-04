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
      expect(input.value).toBe('10');
    });

    it('should decrease the value by step', async () => {
      const { getByLabelText, getByRole } = render(<ControlledInput {...defaultProps} step={5} />);
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      await waitFor(() => getByLabelText(defaultProps.t.decrement).click());

      expect(valueBefore).toBe('');
      expect(input.value).toBe('-5');
    });
  });

  describe('Keyboard', () => {
    it('should increase the value by step', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} step={10} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input.value).toBe('10');
    });

    it('should decrease the value by step', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} step={5} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(input.value).toBe('-5');
    });
  });

  describe('Max integer/decimal parts limits', () => {
    it('should prevent typing longer integer part than expected', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} maxIntLength={3} />);
      const input = getByRole('textbox') as HTMLInputElement;

      '1234'.split('').forEach((char) => {
        fireEvent.input(input, { target: { value: input.value + char } });
      });

      expect(input.value).toBe('123');
    });

    it('should prevent typing longer decimal part than expected', async () => {
      const { getByRole } = render(
        <ControlledInput {...defaultProps} mode="decimal" maxDecimalLength={2} />,
      );
      const input = getByRole('textbox') as HTMLInputElement;

      '12.345'.split('').forEach((char) => {
        fireEvent.input(input, { target: { value: input.value + char } });
      });

      await waitFor(() => expect(input.value).toBe('12.34'));
    });

    it('should prevent going out of bounds on ArrowUp', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} maxIntLength={3} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '999' } });
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on ArrowDown', async () => {
      const { getByRole } = render(<ControlledInput {...defaultProps} maxIntLength={3} />);
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '-999' } });
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(input.value).toBe('-999');
    });

    it('should prevent going out of bounds on increment button click', async () => {
      const { getByRole, getByLabelText } = render(
        <ControlledInput {...defaultProps} maxIntLength={3} />,
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '999' } });
      await waitFor(() => getByLabelText(defaultProps.t.increment).click());

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on decrement button click', async () => {
      const { getByRole, getByLabelText } = render(
        <ControlledInput {...defaultProps} maxIntLength={3} />,
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '-999' } });
      await waitFor(() => getByLabelText(defaultProps.t.decrement).click());

      expect(input.value).toBe('-999');
    });
  });
});
