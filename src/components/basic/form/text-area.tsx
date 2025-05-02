import { cn } from '@/utils/tailwind';
import { TextareaHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from './root/form';
import { classNames } from './text-input';

type TextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> & {
  name: string;
  error?: string;
};

type TextAreaContainerProps<T extends FieldValues> = Omit<TextAreaProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const TextArea = ({ error, className, ...props }: TextAreaProps) => {
  return (
    <>
      <textarea
        {...props}
        value={props.value ?? ''}
        className={cn(
          ...classNames({ isValid: !error }),
          'min-h-[calc(2*1px+2*0.5rem+3*1.5rem)]',
          className,
        )}
      />
      <Form.Error>{error}</Form.Error>
    </>
  );
};

const TextAreaContainer = <T extends FieldValues>(props: TextAreaContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextArea error={fieldState.error?.message} {...rest} {...field} />;
};

export { TextArea, TextAreaContainer };
