import { HTMLAttributes, useEffect, useRef } from 'react';

type DrawerProps = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onClose: () => void;
};

const Drawer = ({ isOpen, onClose, children, ...props }: DrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) ref.current?.focus();
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      onClose();
      e.stopPropagation();
    }
  };

  return (
    <div
      {...props}
      ref={ref}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg z-50 p-4 transition-transform transform outline-none ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {children}
    </div>
  );
};

export { Drawer };
