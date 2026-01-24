import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type SkeletonProps = Omit<HtmlProps<'div'>, 'children'>;

const Skeleton = ({ className, ...rest }: SkeletonProps) => {
  return (
    <div
      role="status"
      aria-busy={true}
      {...rest}
      className={cn(
        'h-[1lh] bg-components-skeleton relative overflow-hidden',
        'before:absolute before:inset-0 before:-translate-x-full',
        'before:bg-gradient-to-r before:from-transparent before:via-background/40 before:to-transfrom-transparent',
        'before:animate-skeleton',
        className,
      )}
    />
  );
};

export { Skeleton };
