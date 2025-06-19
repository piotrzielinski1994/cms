import { cn } from '@/utils/tailwind';
import { isDecimal, isInteger } from '@/utils/zod';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';
import { inputClassNames } from '../text-input/text-input';

// Types ====================================

type NumberInputProps = IntegerInputProps | DecimalInputProps;
type NumberInputContainerProps<T extends FieldValues> =
  | (Omit<IntegerInputProps, 'name'> & { control: Control<T>; name: Path<T> })
  | (Omit<DecimalInputProps, 'name'> & { control: Control<T>; name: Path<T> });

type NumberInputPropsBase = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name'
> & {
  name: string;
  error?: string;
  step?: number;
  min?: number;
  max?: number;
  t?: {
    increment: string;
    decrement: string;
  };
};
type IntegerInputProps = NumberInputPropsBase & { mode?: 'integer'; maxIntLength?: number };
type DecimalInputProps = NumberInputPropsBase & {
  mode: 'decimal';
  maxIntLength?: number;
  maxDecimalLength?: number;
};

// Variables ====================================

const NumberInput = ({ error, step = 1, mode = 'integer', t, ...props }: NumberInputProps) => {
  const [rawValue, setRawValue] = useState<string>(props.value?.toString() ?? '');

  const changeValue = (delta: number) => {
    const raw = rawValue.replace(',', '.') || '0';
    const validator = getValidator({ ...props, mode });
    if (!validator.safeParse(raw).success) return;

    const next = Number(raw) + delta * step;
    const [intPartRaw, decPart = ''] = String(next).split('.');
    const intPart = intPartRaw.startsWith('-') ? intPartRaw.slice(1) : intPartRaw;

    const { maxIntLength = Infinity, maxDecimalLength = Infinity } = props as DecimalInputProps;
    if (intPart.length > maxIntLength) return;
    if (decPart.length > maxDecimalLength) return;

    const event = { target: { value: String(next) } } as ChangeEvent<HTMLInputElement>;
    setRawValue(String(next));
    props?.onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="tel"
          autoComplete="off"
          {...omitCustomProps({ ...props, mode })}
          value={rawValue}
          className={cn(
            inputClassNames.input({ isValid: !error }),
            'w-full pr-6',
            props?.className,
          )}
          onChange={(e) => {
            const raw = e.target.value.replace(',', '.');
            const validator = getValidator({ ...props, mode });

            if (!['', '-'].includes(raw) && !validator.safeParse(raw).success) return;

            setRawValue(raw);
            props?.onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') changeValue(1);
            if (e.key === 'ArrowDown') changeValue(-1);
            props?.onKeyDown?.(e);
          }}
        />
        <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
          <button
            type="button"
            tabIndex={-1}
            disabled={props.disabled}
            aria-label={t?.increment}
            onClick={() => changeValue(1)}
          >
            <ChevronUp size="1rem" />
          </button>
          <button
            type="button"
            tabIndex={-1}
            disabled={props.disabled}
            aria-label={t?.decrement}
            onClick={() => changeValue(-1)}
          >
            <ChevronDown size="1rem" />
          </button>
        </div>
      </div>
      <Form.Error>{error}</Form.Error>
    </div>
  );
};

const NumberInputContainer = <T extends FieldValues>(props: NumberInputContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const t = useTranslations('frontend');
  const { field, fieldState } = useController({ control, name });
  return (
    <NumberInput
      error={fieldState.error?.message}
      t={{
        increment: t('increment'),
        decrement: t('decrement'),
      }}
      {...rest}
      {...field}
      onChange={(e) => {
        const raw = e.target.value.replace(',', '.');
        const value = ['', '-'].includes(raw) ? null : Number(raw);
        field.onChange(value);
      }}
    />
  );
};

const getValidator = (props: NumberInputProps) => {
  const isNegative = props.min === undefined || props.min < 0;

  if (props.mode === 'decimal') {
    const { maxIntLength, maxDecimalLength } = props;
    return isDecimal({
      int: maxIntLength,
      frac: maxDecimalLength,
      negative: isNegative,
    });
  }

  return isInteger(props.maxIntLength, isNegative);
};

const omitCustomProps = (props: NumberInputProps) => {
  if (props.mode === 'decimal') {
    const { maxIntLength: _, maxDecimalLength: __, ...restProps } = props;
    return restProps;
  }

  const { maxIntLength: _, ...restProps } = props;
  return restProps;
};

export { NumberInput, NumberInputContainer };
