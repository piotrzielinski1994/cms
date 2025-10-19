import { Locale } from 'next-intl';
import {
  ButtonHTMLAttributes,
  ChangeEvent,
  createContext,
  DetailedHTMLProps,
  forwardRef,
  HTMLAttributes,
  InputHTMLAttributes,
  RefObject,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import Form from '../root/form';
import { createNumberFormatter, createNumberUnformatter, isNumeric } from './number-input.utils';

type InputProps = {
  name: string;
  value?: number | string; // To support formatted values
  min?: number;
  max?: number;
  step?: number;
  maxIntLength?: number;
  maxDecimalLength?: number;
  locale?: Locale;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'value'>;

type InputRef = HTMLInputElement & { changeValue: (delta: number) => void };

const InputContext = createContext<RefObject<InputRef | undefined>>({ current: undefined });

// To hold input along with buttons
const InputWrapper = (props: HTMLAttributes<HTMLDivElement>) => {
  const inputContext = useRef<InputRef>(undefined);
  return (
    <InputContext.Provider value={inputContext}>
      <div {...props} />
    </InputContext.Provider>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // To support formatted values
  const { step = 1, maxIntLength, maxDecimalLength, locale = 'en', ...rest } = props;
  const defaultProps = { type: 'text', role: 'spinbutton', autoComplete: 'off' };

  const [rawValue, setRawValue] = useState(props.value?.toString() ?? '');
  const context = useContext(InputContext);

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

      const nextRaw = (Number(raw) + delta * step).toFixed(maxDecimalLength);
      const parsed = validator.safeParse(String(nextRaw));
      const next = parsed.success ? Number(parsed.data) : Number(raw);

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

  const setRef = (element: HTMLInputElement | null) => {
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
    const enhancedElement = element ? Object.assign(element, { changeValue }) : undefined;
    context.current = enhancedElement;
  };

  return (
    <input
      lang={locale}
      inputMode={!!maxDecimalLength ? 'decimal' : 'numeric'}
      {...defaultProps}
      {...rest}
      ref={setRef}
      value={format(rawValue)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowUp') return changeValue(1);
        if (e.key === 'ArrowDown') return changeValue(-1);
        rest?.onKeyDown?.(e);
      }}
      onChange={(e) => {
        const raw = unformat(e.target.value);

        const allowedNonNumericSymbols = canBeNegative ? ['', '-'] : [''];
        const isValid = allowedNonNumericSymbols.includes(raw) || validator.safeParse(raw).success;
        if (!isValid) return;

        setRawValue(raw);
        rest?.onChange?.(e);
      }}
    />
  );
});

const Button = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & { mode: 'increment' | 'decrement' },
) => {
  const { mode, ...rest } = props;
  const context = useContext(InputContext);

  // Use up/down arrows instead of focusing buttons
  return (
    <button
      type="button"
      tabIndex={-1}
      {...rest}
      onClick={(e) => {
        context.current?.changeValue(mode === 'increment' ? 1 : -1);
        rest.onClick?.(e);
      }}
    />
  );
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
