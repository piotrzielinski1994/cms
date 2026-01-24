import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ElementType } from 'react';

const styles = {
  group: 'grid gap-1 content-start grid-rows-[auto_1fr]',
  label: 'self-end',
  error: 'min-h-[1em] text-sm text-red-500 leading-none',
} as const;

const Root = (props: HtmlProps<'form'>) => {
  return <form {...props} />;
};

const Group = ({ className, ...props }: HtmlProps<'div'>) => {
  return <div className={cn(styles.group, className)} {...props} />;
};

const Label = <T extends HtmlProps<'label'>>(props: T & { as?: ElementType }) => {
  const { as: Cmp = 'label', className, ...rest } = props;
  return <Cmp {...rest} className={cn(styles.label, className)} />;
};

const Error = ({ className, ...rest }: HtmlProps<'span'>) => {
  const classNames = cn(styles.error, className);
  return <span role="alert" aria-hidden={!rest.children} {...rest} className={classNames} />;
};

const Form = {
  Root,
  Group,
  Label,
  Error,
};

export default Form;
