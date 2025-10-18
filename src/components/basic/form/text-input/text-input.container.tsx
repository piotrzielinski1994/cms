import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextInput } from './text-input';

type TextInputContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ComponentProps<typeof TextInput>, 'name' | 'isValid'>;

const TextInputContainer = <T extends FieldValues>(props: TextInputContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextInput {...rest} {...field} error={fieldState.error?.message} />;
};

export { TextInputContainer };
