import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ElementType } from 'react';

const Root = (props: HtmlProps['form']) => {
  return <form {...props} />;
};

const Group = ({ className, ...props }: HtmlProps['div']) => {
  const base = 'grid gap-1 content-start grid-rows-[auto_1fr]';
  return <div className={cn(base, className)} {...props} />;
};

const Label = <T extends HtmlProps['label']>(props: T & { as?: ElementType }) => {
  const { as: Cmp = 'label', className, ...rest } = props;
  return <Cmp {...rest} className={cn('self-end', className)} />;
};

const Error = ({ className, ...rest }: HtmlProps['span']) => {
  const base = 'min-h-[1em] text-sm text-red-500 leading-none';
  return (
    <span role="alert" aria-hidden={!rest.children} {...rest} className={cn(base, className)} />
  );
};

const Form = {
  Root,
  Group,
  Label,
  Error,
};

export default Form;
