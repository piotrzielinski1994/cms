import { cn } from '@/utils/tailwind';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { z } from 'zod';
import Form from './form';
import { classNames } from './text-input';

type NumberInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name'
> & {
  name: string;
  error?: string;
  step?: number;
};

type NumberInputContainerProps<T extends FieldValues> = Omit<NumberInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const NumberInput = ({ error, step = 1, ...props }: NumberInputProps) => {
  const changeValue = (delta: number) => {
    const current = Number(props.value ?? 0);
    const next = current + delta * step;
    const event = { target: { value: String(next) } } as ChangeEvent<HTMLInputElement>;
    props?.onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          type="tel"
          autoComplete="off"
          {...props}
          value={props.value ?? ''}
          className={cn(...classNames({ isValid: !error }), 'w-full pr-6', props?.className)}
          onChange={(e) => {
            const { success } = z.coerce.number().safeParse(e.target.value);
            if (!success && e.target.value !== '') return;
            props?.onChange?.(e);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') changeValue(1);
            if (e.key === 'ArrowDown') changeValue(-1);
            props?.onKeyDown?.(e);
          }}
        />
        <div className="absolute inset-y-0 right-1 flex flex-col justify-center">
          <button type="button" tabIndex={-1} onClick={() => changeValue(1)}>
            <ChevronUp size="1rem" />
          </button>
          <button type="button" tabIndex={-1} onClick={() => changeValue(-1)}>
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
  const { field, fieldState } = useController({ control, name });
  return (
    <NumberInput
      error={fieldState.error?.message}
      {...rest}
      {...field}
      onChange={(e) => {
        const value = e.target.value === '' ? null : Number(e.target.value);
        field.onChange(value);
      }}
    />
  );
};

export { NumberInput, NumberInputContainer };
