import { cn } from '@/utils/tailwind';
import { Check } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> & {
  label: string;
  name: string;
  error?: string;
};

type CheckboxContainerProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const checkboxClassNames = {
  wrapper: cn(
    'group',
    'has-[:disabled]:text-foreground/50',
    'grid grid-cols-[auto_1fr] gap-2',
    'cursor-pointer has-[:disabled]:cursor-not-allowed',
  ),
  checkbox: ({ isValid }: { isValid: boolean }) => {
    return cn(
      'w-[1lh] h-[1lh] p-[0.15lh]',
      'border border-solid border-current bg-input',
      'group-hover:group-has-[input:enabled]:border-foreground/90',
      'group-hover:group-has-[input:enabled]:ring-foreground/90',
      { '[&:not(:focus)]:text-red-500': !isValid },
      'ring-inset focus-within:ring-1 ring-current',
    );
  },
  icon: cn('hidden group-has-[:checked]:block', 'w-[0.7lh] h-[0.7lh] -ml-[0.03lh]'),
};

const Checkbox = ({ label, error, className, ...props }: CheckboxProps) => {
  return (
    <Form.Group>
      <Form.Label className={checkboxClassNames.wrapper}>
        <div className={cn(checkboxClassNames.checkbox({ isValid: !error }), className)}>
          <input {...props} type="checkbox" className="sr-only" />
          <Check className={checkboxClassNames.icon} />
        </div>
        <span>{label}</span>
      </Form.Label>
      <Form.Error>{error}</Form.Error>
    </Form.Group>
  );
};

const CheckboxContainer = <T extends FieldValues>(props: CheckboxContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <Checkbox error={fieldState.error?.message} {...rest} {...field} />;
};

export { Checkbox, CheckboxContainer };
