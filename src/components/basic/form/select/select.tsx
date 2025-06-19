import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import Form from '../root/form';
import { inputClassNames } from '../text-input/text-input';

type SelectProps = Omit<
  DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>,
  'name'
> & {
  name: string;
  error?: string;
  placeholder?: string;
  options: {
    value: string;
    label: string;
  }[];
};

type SelectContainerProps<T extends FieldValues> = Omit<SelectProps, 'name'> & {
  control: Control<T>;
  name: Path<T>;
};

const Select = ({ error, options, placeholder = '', className, ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid items-center">
        <select
          defaultValue=""
          className={cn(
            'appearance-none',
            { 'cursor-pointer': !props.disabled },
            inputClassNames.input({ isValid: !error }),
            'col-start-1 row-start-1',
            className,
          )}
          {...props}
        >
          <option value="" disabled className="hidden">
            {placeholder}
          </option>
          {options.map((o) => {
            return (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            );
          })}
        </select>
        <ChevronDown size="1rem" className="col-start-1 row-start-1 justify-self-end mr-1" />
      </div>
      <Form.Error>{error}</Form.Error>
    </div>
  );
};

const SelectContainer = <T extends FieldValues>(props: SelectContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return (
    <Select
      error={fieldState.error?.message}
      {...rest}
      {...field}
      onChange={(e) => {
        const value = e.target.value === '' ? null : e.target.value;
        field.onChange(value);
      }}
    />
  );
};

export { Select, SelectContainer };
