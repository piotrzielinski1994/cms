import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Checkbox } from './checkbox';

type CheckboxContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ComponentProps<typeof Checkbox>, 'name'>;

const CheckboxContainer = <T extends FieldValues>(props: CheckboxContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <Checkbox error={fieldState.error?.message} {...rest} {...field} />;
};

export { CheckboxContainer };
