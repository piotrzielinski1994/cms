import { cn } from '@/_old/utilities/ui';
import { Link } from '@/payload/locale/routing';
import { ComponentProps } from 'react';

const ButtonLink = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return (
    <Link as={'a'} className={cn('px-6 py-3', 'bg-red-600', 'font-medium', className)} {...rest} />
  );
};

export default ButtonLink;
