import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type BadgeProps = HtmlProps<'div'> & {
  bgColor: string;
  textColor: string;
};

const Badge = ({ bgColor, textColor, className, style, ...rest }: BadgeProps) => {
  return (
    <div
      {...rest}
      className={cn('py-1 px-2 w-fit', 'flex gap-2 flex-wrap', 'text-xs font', className)}
      style={{ backgroundColor: bgColor, color: textColor, ...style }}
    />
  );
};

export { Badge };
