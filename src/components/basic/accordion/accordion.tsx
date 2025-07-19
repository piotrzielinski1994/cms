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
  const [activeIndex, setActiveIndex] = useState(activeItemIndex);
  const contentRefs = useRef<HTMLDivElement[]>([]);
  const id = useId();

  useEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (!content) return;
      content.style.maxHeight = activeIndex === index ? content.scrollHeight + 'px' : '0';
    });
  }, [activeIndex]);

  return (
    <div {...props} className={cn('grid gap-2', 'cms-accordion', className)} role="radiogroup">
      {items.map(({ heading, content }, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={String(heading)}
            className={cn('bg-components-accordion text-components-accordion-foreground', 'group')}
          >
            <label
              htmlFor={`${id}__${index}__input`}
              id={`${id}__${index}__label`}
              className={cn(
                'w-full px-4 py-2 flex justify-between items-center gap-2 text-lg cursor-pointer select-none',
                { 'outline outline-2 outline-offset-2 outline-blue-500': isActive },
                'focus-within:tw-cms-outline',
              )}
            >
              <input
                type="radio"
                name={`${id}-accordion`}
                id={`${id}__${index}__input`}
                checked={isActive}
                onChange={() => setActiveIndex(isActive ? undefined : index)}
                onClick={() => setActiveIndex(isActive ? undefined : index)}
                onKeyDown={(e) => {
                  if (![' ', 'Enter'].includes(e.key)) return;
                  e.preventDefault();
                  setActiveIndex(activeIndex === index ? undefined : index);
                }}
                className="sr-only"
                aria-checked={isActive}
              />
              <span>{heading}</span>
              <ChevronDown
                className={cn('h-[1em] w-[1em] transition-transform', { 'rotate-180': isActive })}
              />
            </label>
            <div
              id={`${id}__${index}__content`}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{
                maxHeight: isActive ? contentRefs.current[index]?.scrollHeight + 'px' : '0',
              }}
              ref={(el) => {
                if (!el) return;
                contentRefs.current[index] = el;
              }}
            >
              <div
                className="px-4 py-2"
                role="region"
                aria-labelledby={`${id}__${index}__label`}
                aria-hidden={!isActive}
              >
                {content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Accordion };
