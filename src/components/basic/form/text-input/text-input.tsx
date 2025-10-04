import { cn } from '@/utils/tailwind';
import * as React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextInputBase } from './text-input.base';

const inputClassNames = {
  input: ({ isValid }: { isValid: boolean }) =>
    cn(
      'p-2 border border-solid border-current bg-input',
      'placeholder-foreground/50',
      '[&:enabled]:hover:border-foreground/90 [&:enabled]:hover:ring-foreground/90',
      'disabled:cursor-not-allowed disabled:text-foreground/50',
      'outline-none ring-inset focus-within:ring-1 ring-current',
      { '[&:not(:focus)]:text-red-500': !isValid },
    ),
  root: cn('flex flex-col gap-2'),
  error: cn('min-h-[1em] text-sm text-red-500 leading-none'),
};

type TextInputProps = React.ComponentProps<typeof TextInputBase.Input> & {
  label?: React.ReactNode;
  error?: string;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, ...props }, ref) => (
    <TextInputBase className={inputClassNames.root}>
      {label && <label>{label}</label>}
      <TextInputBase.Input
        ref={ref}
        className={cn(inputClassNames.input({ isValid: !error }), className)}
        {...props}
      />
      <TextInputBase.Error className={inputClassNames.error}>{error}</TextInputBase.Error>
    </TextInputBase>
  ),
);
TextInput.displayName = 'TextInput';

type TextInputContainerProps<T extends FieldValues> = Omit<TextInputProps, 'name' | 'isValid'> & {
  control: Control<T>;
  name: Path<T>;
};

const TextInputContainer = <T extends FieldValues>(props: TextInputContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextInput {...rest} {...field} error={fieldState.error?.message} />;
};

export { inputClassNames, TextInput, TextInputContainer };
