import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { forwardRef, ReactNode } from 'react';
import Form from '../root/form';

type TextInputProps = NativeProps & {
  label?: ReactNode;
  error?: string;
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'input', {
  name: string;
  value?: string;
}>;

const styles = {
  native: ({ isValid }: { isValid: boolean }) =>
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
  const { label, error, className, ...rest } = props;
  return (
    <Root className={className}>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Native ref={ref} aria-invalid={!!error} {...rest} />
      <Error>{error}</Error>
    </Root>
  );
});

const Native = forwardRef<HTMLInputElement, NativeProps>((props, ref) => {
  const { value = '', className, ...rest } = props;
  const base = styles.native({ isValid: !!rest['aria-invalid'] });
  return <input ref={ref} {...rest} className={cn(base, className)} value={value} />;
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const TextInput = Object.assign(Component, { Root, Label, Native, Error });

export { styles, TextInput };
