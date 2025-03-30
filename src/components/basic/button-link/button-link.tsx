import { Link } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import { ComponentProps } from 'react';

const ButtonLink = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return (
    <Link as={'a'} className={cn('px-6 py-3', 'bg-red-600', 'font-medium', className)} {...rest} />
  );
};

export { ButtonLink };
