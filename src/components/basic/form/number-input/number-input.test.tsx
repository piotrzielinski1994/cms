import { withProviders } from '@/utils/tests';
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
    const [value, setValue] = useState<number | undefined>(props.value);
    return (
      <NumberInput
        {...props}
        value={value}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          setValue(isNaN(value) ? undefined : value);
        }}
      />
    );
  };

  it('should have no accessibility violations', async () => {
    const { container } = render(
      withProviders(
        <Form.Group>
          <Form.Label htmlFor={defaultProps.id}>Label</Form.Label>
          <NumberInput {...defaultProps} />
        </Form.Group>,
      ),
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should match the snapshot', async () => {
    const { container } = render(withProviders(<NumberInput {...defaultProps} />));
    expect(container).toMatchSnapshot();
  });

  describe('Buttons', () => {
    it.each([
      { step: 10, initial: undefined, expected: '10' },
      { step: 1, initial: 0, expected: '1' },
      { step: 1.2, initial: 3.4, expected: '4.6' },
      { step: 1.2, initial: -1, expected: '0.2' },
    ])('should increase $initial by $step to $expected', async ({ step, initial, expected }) => {
      const { getByLabelText, getByRole } = render(
        withProviders(
          <ControlledInput
            {...defaultProps}
            step={step}
            value={initial}
            mode="decimal"
            maxDecimalLength={2}
          />,
        ),
      );
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      await waitFor(() => getByLabelText(defaultProps.t.increment).click());

      expect(valueBefore).toBe(initial?.toString() ?? '');
      expect(input.value).toBe(expected);
    });

    it.each([
      { step: 10, initial: undefined, expected: '-10' },
      { step: 1, initial: 0, expected: '-1' },
      { step: 1.2, initial: 3.4, expected: '2.2' },
      { step: 1.2, initial: 1, expected: '-0.2' },
    ])('should decrease $initial by $step to $expected', async ({ step, initial, expected }) => {
      const { getByLabelText, getByRole } = render(
        withProviders(
          <ControlledInput
            {...defaultProps}
            step={step}
            value={initial}
            mode="decimal"
            maxDecimalLength={2}
          />,
        ),
      );
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      await waitFor(() => getByLabelText(defaultProps.t.decrement).click());

      expect(valueBefore).toBe(initial?.toString() ?? '');
      expect(input.value).toBe(expected);
    });
  });

  describe('Keyboard', () => {
    it.each([
      { step: 10, initial: undefined, expected: '10' },
      { step: 1, initial: 0, expected: '1' },
      { step: 1.2, initial: 3.4, expected: '4.6' },
      { step: 1.2, initial: -1, expected: '0.2' },
    ])('should increase $initial by $step to $expected', async ({ step, initial, expected }) => {
      const { getByRole } = render(
        withProviders(
          <ControlledInput
            {...defaultProps}
            step={step}
            value={initial}
            mode="decimal"
            maxDecimalLength={2}
          />,
        ),
      );
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(valueBefore).toBe(initial?.toString() ?? '');
      expect(input.value).toBe(expected);
    });

    it.each([
      { step: 10, initial: undefined, expected: '-10' },
      { step: 1, initial: 0, expected: '-1' },
      { step: 1.2, initial: 3.4, expected: '2.2' },
      { step: 1.2, initial: 1, expected: '-0.2' },
    ])('should decrease $initial by $step to $expected', async ({ step, initial, expected }) => {
      const { getByRole } = render(
        withProviders(
          <ControlledInput
            {...defaultProps}
            step={step}
            value={initial}
            mode="decimal"
            maxDecimalLength={2}
          />,
        ),
      );
      const input = getByRole('textbox') as HTMLInputElement;
      const valueBefore = input.value;

      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(valueBefore).toBe(initial?.toString() ?? '');
      expect(input.value).toBe(expected);
    });
  });

  describe('Max integer/decimal parts limits', () => {
    it('should prevent typing longer integer part than expected', async () => {
      const { getByRole } = render(
        withProviders(<ControlledInput {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      '1234'.split('').forEach((char) => {
        fireEvent.input(input, { target: { value: input.value + char } });
      });

      expect(input.value).toBe('123');
    });

    it('should prevent typing longer decimal part than expected', async () => {
      const { getByRole } = render(
        withProviders(<ControlledInput {...defaultProps} mode="decimal" maxDecimalLength={2} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      '12.345'.split('').forEach((char) => {
        fireEvent.input(input, { target: { value: input.value + char } });
      });

      await waitFor(() => expect(input.value).toBe('12.34'));
    });

    it('should prevent going out of bounds on ArrowUp', async () => {
      const { getByRole } = render(
        withProviders(<ControlledInput {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '999' } });
      fireEvent.keyDown(input, { key: 'ArrowUp' });

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on ArrowDown', async () => {
      const { getByRole } = render(
        withProviders(<ControlledInput {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '-999' } });
      fireEvent.keyDown(input, { key: 'ArrowDown' });

      expect(input.value).toBe('-999');
    });

    it('should prevent going out of bounds on increment button click', async () => {
      const { getByRole, getByLabelText } = render(
        withProviders(<ControlledInput {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '999' } });
      await waitFor(() => getByLabelText(defaultProps.t.increment).click());

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on decrement button click', async () => {
      const { getByRole, getByLabelText } = render(
        withProviders(<ControlledInput {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      fireEvent.change(input, { target: { value: '-999' } });
      await waitFor(() => getByLabelText(defaultProps.t.decrement).click());

      expect(input.value).toBe('-999');
    });
  });
});
