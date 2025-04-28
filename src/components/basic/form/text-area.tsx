import { cn } from '@/utils/tailwind';
import { ComponentProps, TextareaHTMLAttributes, useId } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from './form';
import { classNames } from './text-input';

type TextAreaProps = Pick<ComponentProps<typeof Form.Group>, 'label' | 'error'> &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
    name: string;
  };

type TextAreaContainerProps<T extends FieldValues> = Omit<TextAreaProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const TextArea = (props: TextAreaProps) => {
  const id = useId();
  return (
    <Form.Group label={props.label} error={props.error} htmlFor={id}>
      <textarea
        id={id}
        {...props}
        className={cn(...classNames({ isValid: !props.error }), props?.className)}
      />
    </Form.Group>
  );
};

const TextAreaContainer = <T extends FieldValues>(props: TextAreaContainerProps<T>) => {
  const { control, label, name } = props;
  const { field, fieldState } = useController({ control, name });
  return (
    <TextArea
      label={label}
      error={fieldState.error?.message}
      {...field}
      value={field.value ?? ''}
    />
  );
};

export { TextArea, TextAreaContainer };
