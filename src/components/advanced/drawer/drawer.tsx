import { EnhancedHtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { useEffect, useRef } from 'react';

// prettier-ignore
type DrawerProps = EnhancedHtmlProps<'div', {
  isOpen: boolean;
  onClose: () => void;
}>;

const styles = {
  root: ({ isOpen }: BoolMap<'isOpen'>) =>
    cn(
      'fixed right-0 inset-y-0 z-50',
      'w-64 p-4',
      'bg-foreground text-background shadow-lg',
      `transform translate-x-full transition-transform`,
      { 'translate-x-0': isOpen },
    ),
};

const Drawer = ({ isOpen, onClose, className, ...rest }: DrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) ref.current?.focus();
  }, [isOpen]);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      {...rest}
      className={cn(styles.root, className)}
      onKeyDown={(e) => {
        if (e.key !== 'Escape') return;
        e.stopPropagation();
        onClose();
        rest.onKeyDown?.(e);
      }}
    />
  );
};

export { Drawer, styles };
