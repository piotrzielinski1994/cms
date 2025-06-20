import { cn } from '@/utils/tailwind';
import { Circle } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { checkboxClassNames } from '../checkbox/checkbox';
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

const Radio = ({ label, error, className, ...props }: RadioProps) => {
  return (
    <Form.Group>
      <Form.Label className={checkboxClassNames.wrapper}>
        <div
          className={cn(
            checkboxClassNames.checkbox({ isValid: !error }),
            'rounded-full',
            className,
          )}
        >
          <input {...props} type="radio" className="sr-only" />
          <Circle className={cn(checkboxClassNames.icon, 'w-[0.4lh] h-[0.4lh]', 'fill-current')} />
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
