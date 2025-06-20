import { cn } from '@/utils/tailwind';
import { Check } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';
import { inputClassNames } from '../text-input/text-input';

type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> & {
  label: string;
  name: string;
  error?: string;
};

type CheckboxContainerProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const Checkbox = ({ label, error, className, ...props }: CheckboxProps) => {
  return (
    <Form.Group>
      <Form.Label
        className={cn(
          'group',
          'has-[:disabled]:text-foreground/50',
          'grid grid-cols-[auto_1fr] gap-2',
          'cursor-pointer has-[:disabled]:cursor-not-allowed',
        )}
      >
        <div
          className={cn(
            inputClassNames.input({ isValid: !error }),
            'w-[1lh] h-[1lh] p-[0.15lh]',
            'group-has-[:disabled]:hover:border-foreground/50',
            className,
          )}
        >
          <input {...props} type="checkbox" className="sr-only" />
          <Check className="hidden group-has-[:checked]:block w-[0.7lh] h-[0.7lh] -ml-[0.05lh]" />
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
