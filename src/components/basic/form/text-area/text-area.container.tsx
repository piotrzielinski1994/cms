import { ComponentProps } from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { TextArea } from './text-area';

type TextAreaContainerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & Omit<ComponentProps<typeof TextArea>, 'name'>;

const TextAreaContainer = <T extends FieldValues>(props: TextAreaContainerProps<T>) => {
  const { control, name, ...rest } = props;
  const { field, fieldState } = useController({ control, name });
  return <TextArea error={fieldState.error?.message} {...rest} {...field} />;
};

export { TextAreaContainer };
