import { useLocaleStore } from '@/store/locale';
import { cn } from '@/utils/tailwind';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';
import { inputClassNames } from '../text-input/text-input';
import { createNumberFormatter, createNumberUnformatter, isNumber } from './number-input.utils';

// Types ====================================

type NumberInputContainerProps<T extends FieldValues> = Omit<NumberInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

type NumberInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name'
> & {
  name: string;
  error?: string;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  maxIntLength?: number;
  maxDecimalLength?: number;
  t?: {
    increment: string;
    decrement: string;
  };
};

// Variables ====================================

const NumberInput = ({
  error,
  step = 1,
  maxIntLength,
  maxDecimalLength,
  t,
  ...props
}: NumberInputProps) => {
  const locale = useLocaleStore();
  const [rawValue, setRawValue] = useState<string>(props.value?.toString() ?? '');

  const format = createNumberFormatter(locale);
  const unformat = createNumberUnformatter(locale);
  const canBeNegative = props.min === undefined || props.min < 0;
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
    props?.onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="text"
          role="spinbutton"
          inputMode={!!maxDecimalLength ? 'decimal' : 'numeric'}
          autoComplete="off"
          lang={locale}
          {...props}
          value={format(rawValue)}
          className={cn(
            inputClassNames.input({ isValid: !error }),
            'w-full pr-6',
            props?.className,
          )}
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
      {...rest}
      {...field}
      error={fieldState.error?.message}
      t={{ increment: t('increment'), decrement: t('decrement') }}
      onChange={(e) => {
        const raw = e.target.value.replace(',', '.');
        const value = ['', '-'].includes(raw) ? null : Number(raw);
        field.onChange(value);
      }}
    />
  );
};

export { NumberInput, NumberInputContainer };
