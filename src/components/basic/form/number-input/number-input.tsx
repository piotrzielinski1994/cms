import { useLocaleStore } from '@/store/locale';
import { cn } from '@/utils/tailwind';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';
import { inputClassNames } from '../text-input/text-input';
import { createNumberFormatter, createNumberUnformatter, getValidator } from './number-input.utils';

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
  value?: number;
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
  const locale = useLocaleStore();
  const [rawValue, setRawValue] = useState<string>(props.value?.toString() ?? '');

  const format = createNumberFormatter(locale);
  const unformat = createNumberUnformatter(locale);

  const changeValue = (delta: number) => {
    const raw = rawValue.replace(',', '.') || '0';

    const validator = getValidator({ ...props, mode });
    if (!validator.safeParse(raw).success) return;

    const { maxIntLength = Infinity, maxDecimalLength = Infinity } = props as DecimalInputProps;
    const next = Number(raw) + delta * step;

    const [intPartRaw, decPart = ''] = Number.isFinite(maxDecimalLength)
      ? next.toFixed(maxDecimalLength).split('.')
      : next.toString().split('.');
    const intPart = intPartRaw.startsWith('-') ? intPartRaw.slice(1) : intPartRaw;

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
          type="text"
          role="spinbutton"
          inputMode="decimal"
          autoComplete="off"
          lang={locale}
          {...omitCustomProps({ ...props, mode })}
          value={format(rawValue)}
          className={cn(
            inputClassNames.input({ isValid: !error }),
            'w-full pr-6',
            props?.className,
          )}
          onChange={(e) => {
            const raw = unformat(e.target.value);
            const validator = getValidator({ ...props, mode });

            if (!['', '-'].includes(raw) && !validator.safeParse(raw).success) return;

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

const omitCustomProps = (props: NumberInputProps) => {
  if (props.mode === 'decimal') {
    const { maxIntLength: _, maxDecimalLength: __, ...restProps } = props;
    return restProps;
  }

  const { maxIntLength: _, ...restProps } = props;
  return restProps;
};

export { NumberInput, NumberInputContainer };
