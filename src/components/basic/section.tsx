import { cn } from '@/utils/tailwind';
import { ComponentPropsWithoutRef } from 'react';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  as?: keyof HTMLElementTagNameMap;
};

const Section = ({ as: HtmlTag = 'section', children, className, ...rest }: SectionProps) => {
  return (
    <HtmlTag {...rest} className={cn('px-4 sm:px-6', 'grid', 'cms-section', className)}>
      {children}
    </HtmlTag>
  );
};

export { Section };
