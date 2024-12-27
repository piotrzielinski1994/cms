import { cn } from '@/_old/utilities/cn';
import { Link } from '@/payload/locale/routing';
import { ComponentProps } from 'react';

const ButtonLink = ({ className, ...rest }: ComponentProps<typeof Link>) => {
  return <Link className={cn('px-6 py-3', 'bg-accent', 'font-medium', className)} {...rest} />;
};

export default ButtonLink;
