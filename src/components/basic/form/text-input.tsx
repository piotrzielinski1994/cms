import { cn } from '@/utils/tailwind';
import { ComponentProps, DetailedHTMLProps, InputHTMLAttributes, useId } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from './form';

type TextInputProps = Pick<ComponentProps<typeof Form.Group>, 'label' | 'error'> &
  Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'name'> & {
    name: string;
  };

type TextInputContainerProps<T extends FieldValues> = Omit<TextInputProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const TextInput = (props: TextInputProps) => {
  const id = useId();
  return (
    <Form.Group label={props.label} error={props.error} htmlFor={id}>
      <input
        type="text"
        id={id}
        {...props}
        className={cn(
          'h-10 p-2',
          'border-2 border-solid border-foreground bg-background1',
          props?.className,
        )}
      />
    </Form.Group>
  );
};

const TextInputContainer = <T extends FieldValues>(props: TextInputContainerProps<T>) => {
  const { control, label, name } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextInput label={label} error={fieldState.error?.message} {...field} />;
};

export { TextInput, TextInputContainer };
