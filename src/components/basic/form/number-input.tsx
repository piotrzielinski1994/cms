import { cn } from '@/utils/tailwind';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
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
};

type NumberInputContainerProps<T extends FieldValues> = Omit<NumberInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const NumberInput = ({ error, ...props }: NumberInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="tel"
        {...props}
        value={props.value ?? ''}
        className={cn(...classNames({ isValid: !error }), props?.className)}
        onChange={(e) => {
          const { success } = z.coerce.number().safeParse(e.target.value);
          if (!success && e.target.value !== '') return;
          props?.onChange?.(e);
        }}
      />
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
