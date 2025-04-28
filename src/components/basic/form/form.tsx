import { cn } from '@/utils/tailwind';
import { FormHTMLAttributes, HTMLProps } from 'react';

const Root = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <form className={cn('', className)} {...props} />;
};

const Group = ({ className, ...props }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'grid gap-2 content-start grid-rows-[auto_1fr]',
        'grid row-span-2 grid-rows-subgrid',
        className,
      )}
      {...props}
    />
  );
};

const Label = (props: HTMLProps<HTMLElement> & { as?: React.ElementType }) => {
  const { as: Cmp = 'label', className, ...rest } = props;
  return <Cmp className={cn('self-end', className)} {...rest} />;
};

const ErrorMessage = ({ className, ...props }: HTMLProps<HTMLParagraphElement>) => {
  return (
    <span
      role="alert"
      className={cn('-mt-1 min-h-[1em] text-sm text-red-500 leading-none', className)}
      {...props}
    />
  );
};

export default { Error: ErrorMessage, Group, Label, Root };
