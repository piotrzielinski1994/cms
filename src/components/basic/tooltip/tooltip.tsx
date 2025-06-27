import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, useId, useState } from 'react';

type TooltipProps = ComponentPropsWithoutRef<'button'> & {
  content: string;
};

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  return (
    <button
      {...props}
      type="button"
      aria-describedby={isVisible ? id : undefined}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onClick={() => setIsVisible((prev) => !prev)}
      className="relative inline-block focus:outline-none"
    >
      {children}
      {isVisible && (
        <div
          id={id}
          role="tooltip"
          className={cn(
            'absolute z-10 mt-2 py-1 px-2 rounded text-xs whitespace-nowrap',
            'left-1/2 -translate-x-1/2 bg-black text-white',
          )}
        >
          {content}
        </div>
      )}
    </button>
  );
};

export { Tooltip };
