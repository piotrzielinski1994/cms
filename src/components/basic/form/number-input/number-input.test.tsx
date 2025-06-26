import { withProviders } from '@/utils/tests';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Locale } from 'next-intl';
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

  const ControlledComponent = (props: ComponentProps<typeof NumberInput>) => {
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
      withProviders()(
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
    const { container } = render(withProviders()(<NumberInput {...defaultProps} />));
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
        withProviders()(
          <ControlledComponent
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

      await userEvent.click(getByLabelText(defaultProps.t.increment));

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
        withProviders()(
          <ControlledComponent
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

      await userEvent.click(getByLabelText(defaultProps.t.decrement));

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
        withProviders()(
          <ControlledComponent
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

      await userEvent.type(input, '{arrowup}');

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
        withProviders()(
          <ControlledComponent
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

      await userEvent.type(input, '{arrowdown}');

      expect(valueBefore).toBe(initial?.toString() ?? '');
      expect(input.value).toBe(expected);
    });
  });

  describe('Max integer/decimal parts limits', () => {
    it('should prevent typing longer integer part than expected', async () => {
      const { getByRole } = render(
        withProviders()(<ControlledComponent {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      for (const char of '1234') {
        await userEvent.type(input, char);
      }

      expect(input.value).toBe('123');
    });

    it('should prevent typing longer decimal part than expected', async () => {
      const { getByRole } = render(
        withProviders()(
          <ControlledComponent {...defaultProps} mode="decimal" maxDecimalLength={2} />,
        ),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      for (const char of '12.345') {
        await userEvent.type(input, char);
      }

      await waitFor(() => expect(input.value).toBe('12.34'));
    });

    it('should prevent going out of bounds on ArrowUp', async () => {
      const { getByRole } = render(
        withProviders()(<ControlledComponent {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, '999');
      await userEvent.type(input, '{arrowup}');

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on ArrowDown', async () => {
      const { getByRole } = render(
        withProviders()(<ControlledComponent {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, '-999');
      await userEvent.type(input, '{arrowdown}');

      expect(input.value).toBe('-999');
    });

    it('should prevent going out of bounds on increment button click', async () => {
      const { getByRole, getByLabelText } = render(
        withProviders()(<ControlledComponent {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, '999');
      await userEvent.click(getByLabelText(defaultProps.t.increment));

      expect(input.value).toBe('999');
    });

    it('should prevent going out of bounds on decrement button click', async () => {
      const { getByRole, getByLabelText } = render(
        withProviders()(<ControlledComponent {...defaultProps} maxIntLength={3} />),
      );
      const input = getByRole('textbox') as HTMLInputElement;

      await userEvent.type(input, '-999');
      await userEvent.click(getByLabelText(defaultProps.t.decrement));

      expect(input.value).toBe('-999');
    });
  });

  describe('Formatter', () => {
    it.each([
      { locale: 'pl', typed: '1234567,89', expected: '1\u00A0234\u00A0567,89' },
      { locale: 'en', typed: '1234567.89', expected: '1,234,567.89' },
    ] satisfies { locale: Locale; typed: string; expected: string }[])(
      'should format $typed to $expected for $locale',
      async ({ locale, typed, expected }) => {
        const { getByRole } = render(
          withProviders({ locale })(
            <ControlledComponent {...defaultProps} mode="decimal" maxDecimalLength={2} />,
          ),
        );
        const input = getByRole('textbox') as HTMLInputElement;

        for (const char of typed) {
          await userEvent.type(input, char);
        }

        expect(input.value).toBe(expected);
      },
    );
  });
});
