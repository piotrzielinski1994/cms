import { Link } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import { ButtonHTMLAttributes, ComponentProps } from 'react';

const classNames = [
  'px-6 py-3',
  'bg-primary hover:bg-primary/90 text-primary-foreground',
  'font-semibold',
  'focus:tw-cms-focus',
];

const Button = ({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button type="button" className={cn(...classNames, className)} {...rest} />;
};

const ButtonLink = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return <Link className={cn(...classNames, className)} {...rest} />;
};

export { Button, ButtonLink };
