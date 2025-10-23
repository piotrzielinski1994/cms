import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, ElementType, forwardRef } from 'react';

type SectionProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

const Section = forwardRef(
  <T extends ElementType = 'section'>(props: SectionProps<T>, ref: React.Ref<HTMLElement>) => {
    const { as: HtmlTag = 'section', className, children, ...rest } = props;
    return (
      <HtmlTag ref={ref} {...rest} className={cn('px-4 sm:px-6', 'grid', 'cms-section', className)}>
        {children}
      </HtmlTag>
    );
  },
);

export { Section };
