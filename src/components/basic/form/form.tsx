import { cn } from '@/utils/tailwind';
import { FormHTMLAttributes, HTMLProps } from 'react';

const Root = ({ className, ...props }: FormHTMLAttributes<HTMLFormElement>) => {
  return <form className={cn('', className)} {...props} />;
};

const Group = ({
  label,
  htmlFor,
  error,
  className,
  ...props
}: HTMLProps<HTMLDivElement> & {
  label: string;
  htmlFor: string;
  error?: string;
}) => {
  return (
    <div className={cn('grid gap-2', 'grid row-span-3 grid-rows-subgrid', className)} {...props}>
      <Label htmlFor={htmlFor} className={cn('self-end')}>
        {label}
      </Label>
      {props.children}
      {!!error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

const Label = (props: HTMLProps<HTMLElement> & { as?: React.ElementType }) => {
  const { as: Cmp = 'label', ...rest } = props;
  return <Cmp {...rest} />;
};

const ErrorMessage = ({ className, ...props }: HTMLProps<HTMLParagraphElement>) => {
  return <span role="alert" className={cn('text-red-500', className)} {...props} />;
};

export default { Error: ErrorMessage, Group, Label, Root };
