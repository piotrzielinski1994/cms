import { cn } from '@/utils/tailwind';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import { inputClassNames } from '../text-input/text-input';
import TextAreaBase from './text-area.base';

type TextAreaProps = ComponentProps<typeof TextAreaBase.Input> & {
  label?: ReactNode;
  error?: string;
};

const Component = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const { label, error, ...rest } = props;
  return (
    <Root>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <Input ref={ref} error={error} {...rest} />
      <Error>{error}</Error>
    </Root>
  );
});

const Input = forwardRef<HTMLTextAreaElement, Omit<TextAreaProps, 'label'>>((props, ref) => {
  const { error, className, ...rest } = props;
  const classNames = cn(
    inputClassNames.input({ isValid: !error }),
    'min-h-[calc(2*1px+2*0.5rem+3*1.5rem)]',
    { 'resize-none': !!props.disabled },
    className,
  );

  return <TextAreaBase.Input ref={ref} className={classNames} {...rest} />;
});

const Root = TextAreaBase.Root;
const Label = TextAreaBase.Label;
const Error = TextAreaBase.Error;

const TextArea = Object.assign(Component, { Root, Label, Input, Error });

export { TextArea };
