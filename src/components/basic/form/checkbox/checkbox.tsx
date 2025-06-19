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
        className={cn('grid grid-cols-[auto_1fr] gap-2', 'cursor-pointer', {
          'cursor-not-allowed': !!props.disabled,
        })}
      >
        <div
          className={cn(
            inputClassNames.input({ isValid: !error }),
            'w-[1lh] h-[1lh] p-[0.15lh]',
            className,
          )}
        >
          <input {...props} type="checkbox" className="peer sr-only w-0 h-0" />
          <Check className="hidden peer-checked:block w-[0.7lh] h-[0.7lh] -ml-[0.05lh]" />
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
