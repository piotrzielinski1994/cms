import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { Radio } from './radio';

type RadioContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ComponentProps<typeof Radio>, 'name'>;

const RadioContainer = <T extends FieldValues>(props: RadioContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <Radio error={fieldState.error?.message} {...rest} {...field} />;
};

export { RadioContainer };
