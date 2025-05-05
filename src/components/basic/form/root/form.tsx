import { cn } from '@/utils/tailwind';
import { FormHTMLAttributes, HTMLAttributes, HTMLProps } from 'react';

const Root = (props: FormHTMLAttributes<HTMLFormElement>) => {
  return <form {...props} />;
};

const Group = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('grid gap-1 content-start grid-rows-[auto_1fr]', className)} {...props} />
  );
};

const Label = (props: HTMLProps<HTMLLabelElement> & { as?: React.ElementType }) => {
  const { as: Cmp = 'label', className, ...rest } = props;
  return <Cmp className={cn('self-end', className)} {...rest} />;
};

const ErrorMessage = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <span
      suppressHydrationWarning
      role="alert"
      className={cn('min-h-[1em] text-sm text-red-500 leading-none', className)}
      {...props}
    />
  );
};

export default { Error: ErrorMessage, Group, Label, Root };
