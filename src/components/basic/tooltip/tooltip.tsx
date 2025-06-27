import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, useEffect, useId, useMemo, useRef, useState } from 'react';

type TooltipProps = ComponentPropsWithoutRef<'button'> & {
  content: string;
};

const Tooltip = ({ content, children, ...props }: TooltipProps) => {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<'center' | 'left' | 'right'>('center');
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !tooltipRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    if (containerRect.left + tooltipRect.width / 2 > window.innerWidth) {
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
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      ref={containerRef}
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
        <div className={cn('absolute top-full pt-2', positionClasses)} ref={tooltipRef}>
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
