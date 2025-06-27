import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, useId, useState } from 'react';

type TooltipProps = ComponentPropsWithoutRef<'button'> & {
  content: string;
};

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const id = useId();

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        {...props}
        type="button"
        aria-describedby={isVisible ? id : undefined}
        onClick={() => setIsVisible((prev) => !prev)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </button>

      {isVisible && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
          <div
            id={id}
            role="tooltip"
            className={cn('py-1 px-2 text-xs bg-foreground text-background')}
          >
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export { Tooltip };
