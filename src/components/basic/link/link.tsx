import { Link as LocalizedLink } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';
import { ComponentProps } from 'react';

const Link = ({ className, ...rest }: ComponentProps<typeof LocalizedLink>) => {
  return (
    <LocalizedLink
      {...rest}
      className={cn('text-primary underline', 'focus:tw-cms-outline', className)}
    />
  );
};

export { Link };
