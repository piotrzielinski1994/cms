import { cn } from '@/utils/tailwind';
import { ElementType, FormHTMLAttributes, HTMLAttributes, HTMLProps } from 'react';

const Form = (props: FormHTMLAttributes<HTMLFormElement>) => <form {...props} />;

const Group = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  const baseClassNames = 'grid gap-1 content-start grid-rows-[auto_1fr]';
  return <div className={cn(baseClassNames, className)} {...props} />;
};

const Label = (props: HTMLProps<HTMLLabelElement> & { as?: ElementType }) => {
  const { as: Cmp = 'label', className, ...rest } = props;
  return <Cmp className={cn('self-end', className)} {...rest} />;
};

const Error = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
  const base = 'min-h-[1em] text-sm text-red-500 leading-none';
  return <span suppressHydrationWarning role="alert" className={cn(base, className)} {...props} />;
};

Form.Group = Group;
Form.Label = Label;
Form.Error = Error;

export default Form;
