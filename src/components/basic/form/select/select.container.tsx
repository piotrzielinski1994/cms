import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Select } from './select';

type SelectContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ComponentProps<typeof Select>, 'name'>;

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

export { SelectContainer };
