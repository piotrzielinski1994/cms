import { cn } from '@/utils/tailwind';
import { Check } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';

type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'> & {
  label: string;
  name: string;
  error?: string;
};

type RadioContainerProps<T extends FieldValues> = Omit<RadioProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const radioClassNames = {
  wrapper: cn(
    'group',
    'has-[:disabled]:text-foreground/50',
    'grid grid-cols-[auto_1fr] gap-2',
    'cursor-pointer has-[:disabled]:cursor-not-allowed',
  ),
  radio: ({ isValid }: { isValid: boolean }) => {
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

const Radio = ({ label, error, className, ...props }: RadioProps) => {
  return (
    <Form.Group>
      <Form.Label className={radioClassNames.wrapper}>
        <div className={cn(radioClassNames.radio({ isValid: !error }), className)}>
          <input {...props} type="radio" className="sr-only" />
          <Check className={radioClassNames.icon} />
        </div>
        <span>{label}</span>
      </Form.Label>
      <Form.Error>{error}</Form.Error>
    </Form.Group>
  );
};

const RadioContainer = <T extends FieldValues>(props: RadioContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <Radio error={fieldState.error?.message} {...rest} {...field} />;
};

export { Radio, RadioContainer };
