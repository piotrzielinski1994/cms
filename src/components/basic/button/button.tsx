import { Link } from '@/config/next.routing.config';
import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ComponentProps, forwardRef } from 'react';

// prettier-ignore
type ButtonProps = EnhancedHtmlProps<'button', {
  variant?: keyof (typeof buttonClassNames)['variant'];
}>;

type LinkButtonProps = ComponentProps<typeof Link> & Pick<ButtonProps, 'disabled' | 'variant'>;

const buttonClassNames = {
  button: cn(
    'px-6 py-3',
    'border-2 border-primary hover:border-primary/90',
    'font-semibold whitespace-nowrap',
    'disabled:cursor-not-allowed',
    'focus-visible:tw-cms-outline',
  ),
  variant: {
    primary: cn(
      'bg-primary hover:bg-primary/90 text-primary-foreground',
      'disabled:border-primary/0 disabled:bg-primary/50',
    ),
    secondary: cn(
      'text-primary',
      'disabled:border-primary/50 disabled:text-primary/50',
      'bg-background [&:not(:disabled)]:hover:bg-foreground/5',
    ),
  },
};

const Button = ({ variant = 'primary', className, ...rest }: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(buttonClassNames.button, buttonClassNames.variant[variant], className)}
      {...rest}
    />
  );
};

const ButtonLink = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant = 'primary', ...rest }: LinkButtonProps, ref) => {
    return (
      <Link
        ref={ref}
        className={cn(buttonClassNames.button, buttonClassNames.variant[variant], className)}
        {...rest}
      />
    );
  },
);

export { Button, buttonClassNames, ButtonLink };
