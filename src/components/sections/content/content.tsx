import type { ReactNode } from 'react';
import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import type { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';

type ContentProps = HtmlProps<'section'> & {
  heading?: string;
  subheading?: string;
  content?: ReactNode;
};

const Content = ({ heading, subheading, content, className, ...rest }: ContentProps) => {
  const hasHeader = Boolean(heading || subheading);

  return (
    <Section {...rest} className={cn('py-10', className)}>
      <Container>
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-4xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        {content && <div>{content}</div>}
      </Container>
    </Section>
  );
};

export { Content };
