import { cn } from '@/utils/tailwind';
import FormBase from './form.base';

const Group = ({ className, ...props }: React.ComponentProps<typeof FormBase.Group>) => {
  const base = 'grid gap-1 content-start grid-rows-[auto_1fr]';
  return <FormBase.Group className={cn(base, className)} {...props} />;
};

const Label = ({ className, ...props }: React.ComponentProps<typeof FormBase.Label>) => {
  return <FormBase.Label className={cn('self-end', className)} {...props} />;
};

const Error = ({ className, ...props }: React.ComponentProps<typeof FormBase.Error>) => {
  const base = 'min-h-[1em] text-sm text-red-500 leading-none';
  return <FormBase.Error suppressHydrationWarning className={cn(base, className)} {...props} />;
};

const Form = {
  Root: FormBase.Root,
  Group,
  Label,
  Error,
};

export default Form;
