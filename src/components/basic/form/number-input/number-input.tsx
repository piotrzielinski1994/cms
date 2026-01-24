import { EnhancedHtmlProps, HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Locale } from 'next-intl';
import {
  ChangeEvent,
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  RefObject,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';
import Form from '../root/form';
import { styles as textInputStyles } from '../text-input/text-input';
import { createNumberFormatter, createNumberUnformatter, isNumeric } from './number-input.utils';

type NumberInputProps = NativeProps & {
  label?: ReactNode;
  error?: string;
  t: {
    increment: string;
    decrement: string;
  };
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'input', {
  name: string;
  value?: number | string; // To support formatted values
  min?: number;
  max?: number;
  step?: number;
  maxIntLength?: number;
  maxDecimalLength?: number;
  lang?: Locale;
}>;

const styles = {
  wrapper: 'relative',
  native: ({ isValid }: BoolMap<'isValid'>) =>
    cn(textInputStyles.native({ isValid }), 'w-full pr-6'),
  buttons: 'absolute inset-y-0 right-1 flex flex-col justify-center',
} as const;

type InputRef = HTMLInputElement & { changeValue: (delta: number) => void };

const InputContext = createContext<RefObject<InputRef | undefined>>({ current: undefined });

const Component = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { label, error, t, className, ...rest } = props;
  return (
    <Root className={className}>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <div className={styles.wrapper}>
        <Native ref={ref} aria-invalid={!!error} {...rest} />
        <div className={styles.buttons}>
          <Button mode="increment" disabled={rest.disabled} aria-label={t.increment} />
          <Button mode="decrement" disabled={rest.disabled} aria-label={t.decrement} />
        </div>
      </div>
      <Error>{error}</Error>
    </Root>
  );
});

const Root = (props: ComponentProps<typeof Form.Root>) => {
  const inputContext = useRef<InputRef>(undefined);
  return (
    <InputContext.Provider value={inputContext}>
      <Form.Root {...props} />
    </InputContext.Provider>
  );
};

const Native = forwardRef<HTMLInputElement, NativeProps>((props, ref) => {
  const { maxIntLength, maxDecimalLength, lang = 'en', step = 1, ...rest } = props;
  const format = createNumberFormatter(lang);
  const unformat = createNumberUnformatter(lang);
  const canBeNegative = rest.min === undefined || rest.min < 0;
  const validator = isNumeric({
    int: maxIntLength,
    frac: maxDecimalLength,
    negative: canBeNegative,
  });

  const [rawValue, setRawValue] = useState(props.value?.toString() ?? '');
  const inputContext = useContext(InputContext);

  const changeValue = (delta: number) => {
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
  };

  const setRef = (element: HTMLInputElement | null) => {
    if (typeof ref === 'function') ref(element);
    else if (ref) ref.current = element;
    const enhancedElement = element ? Object.assign(element, { changeValue }) : undefined;
    inputContext.current = enhancedElement;
  };

  return (
    <input
      ref={setRef}
      inputMode={!!maxDecimalLength ? 'decimal' : 'numeric'}
      role="spinbutton"
      autoComplete="off"
      {...rest}
      className={cn(styles.native({ isValid: !rest['aria-invalid'] }), rest.className)}
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

const Button = (props: HtmlProps<'button'> & { mode: 'increment' | 'decrement' }) => {
  const { mode, children, ...rest } = props;
  const inputContext = useContext(InputContext);
  const renderZone = useMemo(() => {
    if (children) return children;
    return mode === 'increment' ? <ChevronUp size="1rem" /> : <ChevronDown size="1rem" />;
  }, [children, mode]);

  return (
    <button
      type="button"
      tabIndex={-1} // Use up/down arrows instead of focusing buttons
      {...rest}
      onClick={(e) => {
        inputContext.current?.changeValue(mode === 'increment' ? 1 : -1);
        rest.onClick?.(e);
      }}
    >
      {renderZone}
    </button>
  );
};

const Label = Form.Label;
const Error = Form.Error;

const NumberInput = Object.assign(Component, { Root, Label, Native, Button, Error });

export { NumberInput };
