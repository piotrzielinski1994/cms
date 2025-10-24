import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { forwardRef, ReactNode } from 'react';
import Form from '../root/form';
import { styles as textInputStyles } from '../text-input/text-input';

type TextAreaProps = NativeProps & {
  label?: ReactNode;
  error?: string;
};

// prettier-ignore
type NativeProps = EnhancedHtmlProps<'textarea', {
  name: string;
  value?: string;
}>;

const styles = {
  native: ({ isValid, isDisabled }: BoolMap<'isValid' | 'isDisabled'>) =>
    cn(textInputStyles.native({ isValid }), 'min-h-[calc(2*1px+2*0.5rem+3*1.5rem)]', {
      'resize-none': isDisabled,
    }),
};

const Component = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { label, error, className, ...rest } = props;
  return (
    <Root className={className}>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Input ref={ref} aria-invalid={!!error} {...rest} />
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLTextAreaElement, NativeProps>((props, ref) => {
  const { value = '', className, ...rest } = props;
  const base = styles.native({
    isValid: !rest['aria-invalid'],
    isDisabled: !!props.disabled,
  });

  return (
    <textarea
      ref={ref}
      contentEditable={false}
      {...rest}
      className={cn(base, className)}
      value={value}
    />
  );
});

const Root = Form.Group;
const Label = Form.Label;
const Error = Form.Error;

const TextArea = Object.assign(Component, { Root, Label, Input, Error });

export { TextArea };
