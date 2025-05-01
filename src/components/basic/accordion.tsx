'use client';

import { cn } from '@/utils/tailwind';
import { ChevronDown } from 'lucide-react';
import React, { useEffect, useId, useRef, useState } from 'react';

type AccordionProps = {
  items: {
    heading: React.ReactNode;
    content: React.ReactNode;
  }[];
};

const Accordion = ({ items }: AccordionProps) => {
  const id = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (openIndex === null) return;
    const content = contentRefs.current[openIndex];
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  }, [openIndex]);

  return (
    <div className="grid gap-2">
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
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
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
