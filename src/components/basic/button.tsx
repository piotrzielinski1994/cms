import { Link } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import { ButtonHTMLAttributes, ComponentProps } from 'react';

const buttonClassNames = [
  'px-6 py-3',
  'bg-primary hover:bg-primary/90 text-primary-foreground',
  'font-semibold',
  'disabled:bg-primary/50 disabled:cursor-not-allowed',
];

const Button = ({ className, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button type="button" className={cn(...buttonClassNames, className)} {...rest} />;
};

const ButtonLink = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return <Link className={cn(...buttonClassNames, className)} {...rest} />;
};

export { Button, buttonClassNames, ButtonLink };
