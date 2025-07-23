import { cn } from '@/utils/tailwind';
import { HTMLAttributes } from 'react';

type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      role="status"
      aria-busy={true}
      {...props}
      className={cn('h-[1lh] bg-components-skeleton animate-pulse', className)}
    />
  );
};

export { Skeleton };
