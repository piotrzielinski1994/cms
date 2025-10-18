import { cn } from '@/utils/tailwind';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import TextInputBase from './text-input.base';

type TextInputProps = ComponentProps<typeof TextInputBase.Input> & {
  label?: ReactNode;
  error?: string;
};

const inputClassNames = {
  input: ({ isValid }: { isValid: boolean }) =>
    cn(
      'p-2 border border-solid border-current bg-input',
      'placeholder-foreground/50',
      '[&:enabled]:hover:border-foreground/90 [&:enabled]:hover:ring-foreground/90',
      'disabled:cursor-not-allowed disabled:text-foreground/50',
      'outline-none ring-inset focus-within:ring-1 ring-current',
      { '[&:not(:focus)]:text-red-500': !isValid },
    ),
};

const Component = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const { label, error, ...rest } = props;
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Input ref={ref} error={error} {...rest} />
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLInputElement, Omit<TextInputProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  const classNames = cn(inputClassNames.input({ isValid: !error }), className);
  return <TextInputBase.Input ref={ref} className={classNames} {...rest} />;
});

const Root = TextInputBase.Root;
const Label = TextInputBase.Label;
const Error = TextInputBase.Error;

Component.displayName = 'TextInput';
Input.displayName = 'TextInput.Input';

const TextInput = Object.assign(Component, { Root, Label, Input, Error });

export { inputClassNames, TextInput };
