import type { ComponentProps } from 'react';
import { Link as LocalizedLink } from '@/config/next.routing.config';
import { cn } from '@/utils/tailwind';

const Link = ({ className, ...rest }: ComponentProps<typeof LocalizedLink>) => {
  return (
    <LocalizedLink
      {...rest}
      className={cn('text-primary underline', 'focus-visible:tw-cms-outline', className)}
    />
  );
};

export { Link };
