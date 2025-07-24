import { cn } from '@/utils/tailwind';
import { HTMLAttributes } from 'react';

type SkeletonProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      role="status"
      aria-busy={true}
      {...props}
      className={cn(
        'h-[4lh] bg-components-skeleton relative overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-background/40 before:to-transfrom-transparent',
        'before:animate-skeleton',
        className,
      )}
    />
  );
};

export { Skeleton };
