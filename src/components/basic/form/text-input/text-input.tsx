import { cn } from '@/utils/tailwind';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';

type TextInputProps = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'name'
> & {
  name: string;
  error?: string;
};

type TextInputContainerProps<T extends FieldValues> = Omit<TextInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const inputClassNames = {
  input: ({ isValid }: { isValid: boolean }) => {
    return cn(
      'p-2',
      'border border-solid border-current bg-input',
      'placeholder-foreground/50',
      '[&:enabled]:hover:border-foreground/90 [&:enabled]:hover:ring-foreground/90',
      'disabled:cursor-not-allowed disabled:text-foreground/50',
      { '[&:not(:focus)]:text-red-500': !isValid },
      'outline-none ring-inset focus-within:ring-1 ring-current',
    );
  },
};

const TextInput = ({ error, ...props }: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        {...props}
        value={props.value ?? ''}
        className={cn(inputClassNames.input({ isValid: !error }), props?.className)}
      />
      <Form.Error>{error}</Form.Error>
    </div>
  );
};

const TextInputContainer = <T extends FieldValues>(props: TextInputContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextInput error={fieldState.error?.message} {...rest} {...field} />;
};

export { inputClassNames, TextInput, TextInputContainer };
