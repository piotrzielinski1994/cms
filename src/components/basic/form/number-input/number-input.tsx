import { useLocaleStore } from '@/store/locale';
import { cn } from '@/utils/tailwind';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent, ComponentProps, forwardRef, ReactNode, useState } from 'react';
import { inputClassNames } from '../text-input/text-input';
import NumberInputBase from './number-input.base';
import { createNumberFormatter, createNumberUnformatter, isNumber } from './number-input.utils';

type NumberInputProps = ComponentProps<typeof NumberInputBase.Input> & {
  label?: ReactNode;
  error?: string;
  maxIntLength?: number;
  maxDecimalLength?: number;
  t?: {
    increment: string;
    decrement: string;
  };
};

const Component = forwardRef<HTMLInputElement, NumberInputProps>((props, ref) => {
  const { label, error, step = 1, maxIntLength, maxDecimalLength, t, ...rest } = props;
  const locale = useLocaleStore();
  const [rawValue, setRawValue] = useState<string>(rest.value?.toString() ?? '');

  const format = createNumberFormatter(locale);
  const unformat = createNumberUnformatter(locale);
  const canBeNegative = rest.min === undefined || rest.min < 0;
  const validator = isNumber({
    int: maxIntLength,
    frac: maxDecimalLength,
    negative: canBeNegative,
  });

  const changeValue = (delta: number) => {
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
  };

  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <InputWrapper className="relative">
        <Input
          ref={ref}
          error={error}
          inputMode={!!maxDecimalLength ? 'decimal' : 'numeric'}
          lang={locale}
          {...rest}
          value={format(rawValue)}
          onChange={(e) => {
            const raw = unformat(e.target.value);

            const allowedNonNumericSymbols = canBeNegative ? ['', '-'] : [''];
            if (!allowedNonNumericSymbols.includes(raw) && !validator.safeParse(raw).success) {
              return;
            }

            setRawValue(raw);
            props?.onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') return changeValue(1);
            if (e.key === 'ArrowDown') return changeValue(-1);
            props?.onKeyDown?.(e);
          }}
        />
        <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
          <Button disabled={rest.disabled} aria-label={t?.increment} onClick={() => changeValue(1)}>
            <ChevronUp size="1rem" />
          </Button>
          <Button
            disabled={rest.disabled}
            aria-label={t?.decrement}
            onClick={() => changeValue(-1)}
          >
            <ChevronDown size="1rem" />
          </Button>
        </div>
      </InputWrapper>
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, Omit<NumberInputProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  const classNames = cn(inputClassNames.input({ isValid: !error }), 'w-full pr-6', className);
  return <NumberInputBase.Input ref={ref} {...rest} className={classNames} />;
});

Component.displayName = 'NumberInput';
Input.displayName = 'NumberInput.Input';

const Root = NumberInputBase.Root;
const Label = NumberInputBase.Label;
const InputWrapper = NumberInputBase.InputWrapper;
const Button = NumberInputBase.Button;
const Error = NumberInputBase.Error;

const NumberInput = Object.assign(Component, { Root, Label, Input, Error });

export { NumberInput };
