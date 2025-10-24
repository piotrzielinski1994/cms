import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { useEffect, useRef } from 'react';

type DrawerProps = HtmlProps<'div'> & {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer = ({ isOpen, onClose, children, ...props }: DrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) ref.current?.focus();
  }, [isOpen]);

  return (
    <div
      {...props}
      ref={ref}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') return;
        e.stopPropagation();
        onClose();
      }}
      className={cn(
        'fixed right-0 inset-y-0 z-50',
        'w-64 p-4',
        'bg-foreground text-background shadow-lg',
        `transform translate-x-full transition-transform`,
        { 'translate-x-0': isOpen },
      )}
    >
      {children}
    </div>
  );
};

export { Drawer };
