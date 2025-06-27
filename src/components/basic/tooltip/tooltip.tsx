import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, useId, useState } from 'react';

type TooltipProps = ComponentPropsWithoutRef<'button'> & {
  content: string;
};

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const id = useId();

  const isVisible = isFocused || isHovered;

  return (
    <button
      {...props}
      type="button"
      aria-describedby={isVisible ? id : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => {
        setIsFocused(false);
        setIsHovered(false);
      }}
      onClick={() => {
        setIsFocused(!isVisible);
        setIsHovered(!isVisible);
      }}
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
