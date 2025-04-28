import { cn } from '@/utils/tailwind';
import { FormHTMLAttributes, HTMLProps } from 'react';

const Root = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <form className={cn('', className)} {...props} />;
};

const Group = (
  props: HTMLProps<HTMLDivElement> & { label: string; htmlFor: string; error?: string },
) => {
  const { label, htmlFor, error, className, ...rest } = props;
  return (
    <div
      className={cn('grid gap-2 content-start', 'grid row-span-3 grid-rows-subgrid', className)}
      {...rest}
    >
      <Label htmlFor={htmlFor} className={cn('self-end')}>
        {label}
      </Label>
      <div className={cn('grid gap-2 content-start', 'grid row-span-2')}>
        {props.children}
        <ErrorMessage className={cn('-mt-1 min-h-[1em]')}>{error ?? ''}</ErrorMessage>
      </div>
    </div>
  );
};

const Label = (props: HTMLProps<HTMLElement> & { as?: React.ElementType }) => {
  const { as: Cmp = 'label', ...rest } = props;
  return <Cmp {...rest} />;
};

const ErrorMessage = ({ className, ...props }: HTMLProps<HTMLParagraphElement>) => {
  return (
    <span
      role="alert"
      className={cn('text-red-500 text-sm inline-block  leading-none', className)}
      {...props}
    />
  );
};

export default { Error: ErrorMessage, Group, Label, Root };
