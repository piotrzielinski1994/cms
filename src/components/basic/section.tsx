import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef, ElementType } from 'react';

type SectionProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
  as?: T;
};

const Section = <T extends ElementType = 'section'>(props: SectionProps<T>) => {
  const { as: HtmlTag = 'section', className, children, ...rest } = props;
  return (
    <HtmlTag {...rest} className={cn('px-4 sm:px-6', 'grid', 'cms-section', className)}>
      {children}
    </HtmlTag>
  );
};

export { Section };
