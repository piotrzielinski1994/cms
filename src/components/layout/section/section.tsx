import { cn } from '@/_old/utilities/cn';
import Container from '@/components/layout/container/container';
import { SectionProps } from './section.types';

const Section = ({ as: HtmlTag = 'section', children, className, ...rest }: SectionProps) => {
  return (
    <HtmlTag {...rest} className={cn('px-4', 'grid', 'cms-section', className)}>
      <Container>{children}</Container>
    </HtmlTag>
  );
};

export default Section;
