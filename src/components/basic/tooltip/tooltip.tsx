import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';

type TooltipProps = ComponentPropsWithoutRef<'button'> & {
  content: string;
};

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'center' | 'left' | 'right'>('center');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isVisible) return;
    if (!tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    if (containerRect.width >= tooltipRect.width) {
      setPosition('center');
    } else if (containerRect.right + tooltipRect.width / 2 > window.innerWidth) {
      setPosition('right');
    } else if (containerRect.left - tooltipRect.width / 2 < 0) {
      setPosition('left');
    } else {
      setPosition('center');
    }
  }, [isVisible]);

  const positionClasses = useMemo(() => {
    switch (position) {
      case 'left':
        return 'left-0 -translate-x-0';
      case 'right':
        return 'right-0 translate-x-0';
      default:
        return 'left-1/2 -translate-x-1/2';
    }
  }, [position]);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <button
        {...props}
        type="button"
        className="focus-visible:tw-cms-outline"
        aria-describedby={isVisible ? id : undefined}
        onClick={() => setIsVisible((prev) => !prev)}
        onBlur={() => setIsVisible(false)}
      >
        {children}
      </button>

      {isVisible && (
        <div className={cn('absolute top-full z-popover pt-2', positionClasses)} ref={tooltipRef}>
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
