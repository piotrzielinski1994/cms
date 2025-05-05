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
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | undefined>(activeItemIndex);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (openIndex === undefined) return;
    const content = contentRefs.current[openIndex];
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  }, [openIndex]);

  return (
    <div {...props} className={cn('grid gap-2', 'cms-accordion', className)}>
      {items.map(({ heading, content }, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={String(heading)}
            className="bg-components-accordion text-components-accordion-foreground"
          >
            <button
              type="button"
              className="w-full px-4 py-2 flex justify-between items-center gap-2 text-lg"
              onClick={() => setOpenIndex(openIndex === index ? undefined : index)}
              aria-controls={`${id}__${index}`}
              aria-expanded={isOpen}
            >
              <span>{heading}</span>
              <ChevronDown
                className={cn('h-[1em] w-[1em] transition-transform', {
                  'rotate-180': isOpen,
                })}
              />
            </button>
            <div
              id={`${id}__${index}`}
              className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? 'auto' : '0' }}
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
