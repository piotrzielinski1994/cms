import { cn } from '@/utils/tailwind';
import { ComponentProps, DetailedHTMLProps, InputHTMLAttributes, useId } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { z } from 'zod';
import Form from './form';
import { classNames } from './text-input';

type NumberInputProps = Pick<ComponentProps<typeof Form.Group>, 'label' | 'error'> &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'name'> & {
    name: string;
  };

type NumberInputContainerProps<T extends FieldValues> = Omit<NumberInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const NumberInput = (props: NumberInputProps) => {
  const id = useId();
  return (
    <Form.Group label={props.label} error={props.error} htmlFor={id}>
      <input
        type="tel"
        id={id}
        {...props}
        value={props.value ?? ''}
        className={cn(...classNames({ isValid: !props.error }), props?.className)}
        onChange={(e) => {
          const { success } = z.coerce.number().safeParse(e.target.value);
          if (!success && e.target.value !== '') return;
          props?.onChange?.(e);
        }}
      />
    </Form.Group>
  );
};

const NumberInputContainer = <T extends FieldValues>(props: NumberInputContainerProps<T>) => {
  const { control, label, name } = props;
  const { field, fieldState } = useController({ control, name });
  return (
    <NumberInput
      label={label}
      error={fieldState.error?.message}
      {...field}
      onChange={(e) => {
        const value = e.target.value === '' ? null : Number(e.target.value);
        field.onChange(value);
      }}
    />
  );
};

export { NumberInput, NumberInputContainer };
