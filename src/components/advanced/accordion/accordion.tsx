'use client';

import { ReactContextError } from '@/utils/error';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { BoolMap } from '@/utils/types';
import { ChevronDown } from 'lucide-react';
import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type AccordionProps = HtmlProps<'div'> & {
  items: { heading: ReactNode; content: ReactNode }[];
  activeItemIndex?: number;
};

type AccordionContextValue = {
  state: { activeIndex?: number };
  actions: { setActiveIndex: (index?: number) => void };
  meta: { id: string; contentRefs: HTMLDivElement[] };
};

const styles = {
  root: 'grid gap-2 cms-accordion',
  item: 'bg-components-accordion text-components-accordion-foreground group',
  itemHeader: ({ isActive }: BoolMap<'isActive'>) =>
    cn(
      'w-full px-4 py-2 sm:px-6 sm:py-4 flex justify-between items-center gap-2 text-lg cursor-pointer select-none',
      { 'outline outline-2 outline-offset-2 outline-blue-500': isActive },
      'tw-has-focus:tw-cms-outline',
    ),
  icon: ({ isActive }: BoolMap<'isActive'>) =>
    cn('h-[1em] w-[1em] transition-transform', { 'rotate-180': isActive }),
  radio: 'sr-only',
  contentWrapper: 'overflow-hidden transition-[max-height] duration-300 ease-in-out',
  content: 'px-4 pb-4 sm:px-6',
} as const;

const AccordionContext = createContext<AccordionContextValue | null>(null);

const Provider = (props: PropsWithChildren & { activeItemIndex?: number }) => {
  const { children, activeItemIndex } = props;
  const id = useId();
  const [activeIndex, setActiveIndex] = useState(activeItemIndex);
  const contentRefs = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    contentRefs.current.forEach((content, index) => {
      if (!content) return;
      content.style.maxHeight = activeIndex === index ? content.scrollHeight + 'px' : '0';
    });
  }, [activeIndex]);

  const value = useMemo(
    () => ({
      state: { activeIndex },
      actions: { setActiveIndex },
      meta: { id, contentRefs: contentRefs.current },
    }),
    [id, activeIndex],
  );

  return <AccordionContext.Provider value={value}>{children}</AccordionContext.Provider>;
};

const Root = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div role="radiogroup" {...rest} className={cn(styles.root, className)} />;
};

const Item = ({ className, ...rest }: HtmlProps<'div'>) => {
  return <div {...rest} className={cn(styles.item, className)} />;
};

const ItemHeader = ({ index, className, children }: HtmlProps<'label'> & { index: number }) => {
  const {
    state: { activeIndex },
    actions: { setActiveIndex },
    meta: { id },
  } = useAccordion();

  const isActive = activeIndex === index;

  return (
    <label
      htmlFor={`${id}__${index}__input`}
      id={`${id}__${index}__label`}
      className={cn(styles.itemHeader({ isActive }), className)}
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
          setActiveIndex(isActive ? undefined : index);
        }}
        className={styles.radio}
      />
      <span>{children}</span>
      <ChevronDown className={cn(styles.icon({ isActive }))} />
    </label>
  );
};

const Content = ({ index, className, children }: HtmlProps<'div'> & { index: number }) => {
  const {
    state: { activeIndex },
    meta: { id, contentRefs },
  } = useAccordion();

  const isActive = activeIndex === index;

  return (
    <div
      ref={(el) => {
        if (!el) return;
        contentRefs[index] = el;
      }}
      id={`${id}__${index}__content`}
      style={{ maxHeight: isActive ? contentRefs[index]?.scrollHeight + 'px' : '0' }}
      className={cn(styles.contentWrapper, className)}
    >
      <div
        role="region"
        aria-labelledby={`${id}__${index}__label`}
        aria-hidden={!isActive}
        className={styles.content}
      >
        {children}
      </div>
    </div>
  );
};

const Accordion = Object.assign(
  (props: AccordionProps) => {
    const { items, activeItemIndex, ...rest } = props;
    return (
      <Provider activeItemIndex={activeItemIndex}>
        <Root {...rest}>
          {items.map((item, index) => (
            <Item key={String(item.heading)}>
              <ItemHeader index={index}>{item.heading}</ItemHeader>
              <Content index={index}>{item.content}</Content>
            </Item>
          ))}
        </Root>
      </Provider>
    );
  },
  { Provider, Root, Item, ItemHeader, Content },
);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (context) return context;
  throw new ReactContextError('Accordion');
};

export { Accordion, styles, useAccordion };
