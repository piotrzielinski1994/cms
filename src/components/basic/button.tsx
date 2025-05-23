import { Link } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import { ButtonHTMLAttributes, ComponentProps } from 'react';

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type LinkButtonProps = BaseButtonProps & ComponentProps<typeof Link>;
type BaseButtonProps = {
  variant?: keyof typeof buttonClassNames.variant;
};

const buttonClassNames = {
  button: cn(
    'px-6 py-3',
    'border-2 border-primary hover:border-primary/90',
    'font-semibold',
    'disabled:cursor-not-allowed box-content',
  ),
  variant: {
    primary: cn('bg-primary hover:bg-primary/90 text-primary-foreground', 'disabled:bg-primary/50'),
    secondary: cn(
      ' text-primary',
      'disabled:border-primary/50 disabled:text-primary/50',

      'bg-transparent hover:bg-foreground/5',
    ),
  },
};

const Button = ({ className, variant = 'primary', ...rest }: NativeButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonClassNames.button, buttonClassNames.variant[variant], className)}
      {...rest}
    />
  );
};

const ButtonLink = ({ className, variant = 'primary', ...rest }: LinkButtonProps) => {
  return (
    <Link
      className={cn(buttonClassNames.button, buttonClassNames.variant[variant], className)}
      {...rest}
    />
  );
};

export { Button, buttonClassNames, ButtonLink };
