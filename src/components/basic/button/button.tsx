import { Link } from '@/config/next.routing.config';
import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ComponentProps, forwardRef } from 'react';

// prettier-ignore
type ButtonProps = EnhancedHtmlProps<'button', {
  variant?: keyof (typeof styles)['variant'];
}>;

type LinkButtonProps = ComponentProps<typeof Link> & Pick<ButtonProps, 'disabled' | 'variant'>;

const styles = {
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
} as const;

const Button = ({ variant = 'primary', className, ...rest }: ButtonProps) => {
  const classNames = cn(styles.button, styles.variant[variant], className);
  return <button type="button" className={classNames} {...rest} />;
};

const ButtonLink = forwardRef<HTMLAnchorElement, LinkButtonProps>((props, ref) => {
  const { className, variant = 'primary', ...rest } = props;
  const classNames = cn(styles.button, styles.variant[variant], className);
  return <Link ref={ref} className={classNames} {...rest} />;
});

export { Button, ButtonLink, styles };
