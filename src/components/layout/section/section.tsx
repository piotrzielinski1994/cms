import { cn } from '@/_old/utilities/ui';
import { SectionProps } from './section.types';

const Section = ({ as: HtmlTag = 'section', children, className, ...rest }: SectionProps) => {
  return (
    <HtmlTag {...rest} className={cn('px-4 sm:px-6', 'grid', 'cms-section', className)}>
      {children}
    </HtmlTag>
  );
};

export default Section;
