'use client';

import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import React, { HTMLAttributes, useEffect, useId, useRef, useState } from 'react';

type AccordionProps = HTMLAttributes<HTMLDivElement> & {
  items: {
    heading: React.ReactNode;
    content: React.ReactNode;
  }[];
  activeItemIndex?: number;
};

const Accordion = ({ items, activeItemIndex, className, ...props }: AccordionProps) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(activeItemIndex);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const id = useId();

  useEffect(() => {
    if (activeIndex === undefined) return;
    const content = contentRefs.current[activeIndex];
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  }, [activeIndex]);

  return (
    <div {...props} className={cn('grid gap-2', 'cms-accordion', className)}>
      {items.map(({ heading, content }, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={String(heading)}
            className="bg-components-accordion text-components-accordion-foreground"
            role="group"
            aria-labelledby={`${id}__${index}__button`}
          >
            <button
              type="button"
              className="w-full px-4 py-2 flex justify-between items-center gap-2 text-lg"
              onClick={() => setActiveIndex(activeIndex === index ? undefined : index)}
              id={`${id}__${index}__button`}
              aria-controls={`${id}__${index}__content`}
              aria-expanded={isActive}
            >
              <span>{heading}</span>
              <ChevronDown
                className={cn('h-[1em] w-[1em] transition-transform', {
                  'rotate-180': isActive,
                })}
              />
            </button>
            <div
              id={`${id}__${index}__content`}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{ maxHeight: isActive ? 'auto' : '0' }}
              ref={(el) => {
                if (!el) return;
                contentRefs.current[index] = el;
              }}
            >
              <div className="px-4 py-2">{content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };
