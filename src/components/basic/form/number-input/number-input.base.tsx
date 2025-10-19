import { Locale } from 'next-intl';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  useCallback,
  useState,
} from 'react';
import Form from '../root/form';
import { createNumberFormatter, createNumberUnformatter, isNumeric } from './number-input.utils';

type InputProps = {
  name: string;
  value?: number | string; // String to support formatted values
  min?: number;
  max?: number;
  step?: number;
  maxIntLength?: number;
  maxDecimalLength?: number;
  locale?: Locale;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value'>;

// To hold input along with buttons
const InputWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  return <div {...props} />;
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // To support formatted values
  const { step = 1, maxIntLength, maxDecimalLength, locale = 'en', ...rest } = props;
  const defaultProps = { type: 'text', role: 'spinbutton', autoComplete: 'off' };
  const [rawValue, setRawValue] = useState(props.value?.toString() ?? '');
  const format = createNumberFormatter(locale);
  const unformat = createNumberUnformatter(locale);
  const canBeNegative = rest.min === undefined || rest.min < 0;
  const validator = isNumeric({
    int: maxIntLength,
    frac: maxDecimalLength,
    negative: canBeNegative,
  });

  const changeValue = useCallback(
    (delta: number) => {
      const raw = rawValue.replace(',', '.') || '0';
      if (!validator.safeParse(raw).success) return;

      const next = Number(raw) + delta * step;

      const [intPartRaw, decPart = ''] = Number.isFinite(maxDecimalLength)
        ? next.toFixed(maxDecimalLength).split('.')
        : next.toString().split('.');
      const intPart = intPartRaw.startsWith('-') ? intPartRaw.slice(1) : intPartRaw;

      if (maxIntLength !== undefined && intPart.length > maxIntLength) return;
      if (maxDecimalLength !== undefined && decPart.length > maxDecimalLength) return;

      const event = { target: { value: String(next) } } as ChangeEvent<HTMLInputElement>;
      setRawValue(String(next));
      rest.onChange?.(event);
    },
    [maxDecimalLength, maxIntLength, rawValue, rest, step, validator],
  );

  return (
    <>
      <input
        lang={locale}
        inputMode={!!maxDecimalLength ? 'decimal' : 'numeric'}
        {...defaultProps}
        {...rest}
        ref={ref}
        value={format(rawValue)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowUp') return changeValue(1);
          if (e.key === 'ArrowDown') return changeValue(-1);
          rest?.onKeyDown?.(e);
        }}
        onChange={(e) => {
          const raw = unformat(e.target.value);

          const allowedNonNumericSymbols = canBeNegative ? ['', '-'] : [''];
          const isValid =
            allowedNonNumericSymbols.includes(raw) || validator.safeParse(raw).success;
          if (!isValid) return;

          setRawValue(raw);
          rest?.onChange?.(e);
        }}
      />
      <button onClick={() => console.log('@@@ story', ref)}>INPUT</button>
    </>
  );
});

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & { mode: 'increment' | 'decrement' },
) => {
  const { mode, ...rest } = props;
  // Use up/down arrows instead of focusing buttons
  return <button type="button" tabIndex={-1} {...rest} />;
};

Input.displayName = 'NumberInputBase.Input';

const NumberInputBase = {
  Root: Form.Group,
  Label: Form.Label,
  InputWrapper,
  Input,
  Button,
  Error: Form.Error,
};

export default NumberInputBase;
