'use client';

import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { ChevronDown } from 'lucide-react';
import { forwardRef, ReactNode, useEffect, useId, useRef, useState } from 'react';

type AccordionProps = HtmlProps<'div'> & {
  items: {
    heading: ReactNode;
    content: ReactNode;
  }[];
  activeItemIndex?: number;
};

const styles = {
  root: cn('grid gap-2', 'cms-accordion'),
  item: cn('bg-components-accordion text-components-accordion-foreground', 'group'),
  itemHeader: ({ isActive }: BoolMap<'isActive'>) =>
    cn(
      'w-full px-4 py-2 sm:px-6 sm:py-4',
      'flex justify-between items-center gap-2 text-lg cursor-pointer select-none',
      { 'outline outline-2 outline-offset-2 outline-blue-500': isActive },
      'tw-has-focus:tw-cms-outline',
    ),
  icon: ({ isActive }: BoolMap<'isActive'>) =>
    cn('h-[1em] w-[1em] transition-transform', { 'rotate-180': isActive }),
  radio: 'sr-only',
  contentWrapper: 'overflow-hidden transition-[max-height] duration-300 ease-in-out',
  content: 'px-4 pb-4 sm:px-6',
} as const;

const Component = ({ items, activeItemIndex, ...rest }: AccordionProps) => {
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
    <Root {...rest}>
      {items.map(({ heading, content }, index) => {
        const isActive = activeIndex === index;
        return (
          <Item key={String(heading)}>
            <ItemHeader
              isActive={isActive}
              htmlFor={`${id}__${index}__input`}
              id={`${id}__${index}__label`}
            >
              <Radio
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
              />
              <span>{heading}</span>
              <Icon isActive={isActive} />
            </ItemHeader>
            <ContentWrapper
              id={`${id}__${index}__content`}
              style={{
                maxHeight: isActive ? contentRefs.current[index]?.scrollHeight + 'px' : '0',
              }}
              ref={(el) => {
                if (!el) return;
                contentRefs.current[index] = el;
              }}
            >
              <Content aria-labelledby={`${id}__${index}__label`} aria-hidden={!isActive}>
                {content}
              </Content>
            </ContentWrapper>
          </Item>
        );
      })}
    </Root>
  );
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div role="radiogroup" {...rest} className={cn(styles.root, className)}></div>;
};

const Item = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.item, className)}></div>;
};

const ItemHeader = ({ isActive, className, ...rest }: HtmlProps<'label'> & BoolMap<'isActive'>) => {
  return <label {...rest} className={cn(styles.itemHeader({ isActive }), className)}></label>;
};

const Radio = ({ className, ...rest }: HtmlProps<'input'>) => {
  return <input type="radio" {...rest} className={cn(styles.radio, className)} />;
};

const Icon = ({ isActive, className, ...rest }: HtmlProps<'svg'> & BoolMap<'isActive'>) => {
  return <ChevronDown {...rest} className={cn(styles.icon({ isActive }), className)} />;
};

const ContentWrapper = forwardRef<HTMLDivElement, HtmlProps<'div'>>((props, ref) => {
  const { className, ...rest } = props;
  return <div ref={ref} {...rest} className={cn(styles.contentWrapper, className)}></div>;
});

const Content = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div role="region" {...rest} className={cn(styles.content, className)}></div>;
};

const Accordion = Object.assign(Component, {
  Root,
  Item,
  ItemHeader,
  Radio,
  Icon,
  ContentWrapper,
  Content,
});

export { Accordion, styles };
