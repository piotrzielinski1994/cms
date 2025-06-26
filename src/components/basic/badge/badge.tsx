import { cn } from '@/utils/tailwind';
import { PropsWithChildren } from 'react';

type BadgeProps = PropsWithChildren & {
  label: string;
  bgColor: string;
  textColor: string;
};

const Badge = ({ label, bgColor, textColor }: BadgeProps) => {
  return (
    <div
      className={cn('py-1 px-2 w-fit', 'flex gap-2 flex-wrap', 'text-xs font')}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </div>
  );
};

export { Badge };
