import { Container } from '@/components/basic/container/container';
import { Section } from '@/components/basic/section/section';
import { HtmlProps } from '@/utils/html/html.types';
import { cn } from '@/utils/tailwind';
import { ReactNode } from 'react';

type ImageBlocksProps = HtmlProps<'section'> & {
  heading?: string;
  subheading?: string;
  items: ReactNode[];
};

const ImageBlocks = ({ heading, subheading, items, ...rest }: ImageBlocksProps) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section {...rest}>
      <Container className="grid gap-8">
        {hasHeader && (
          <header className={cn('grid gap-4', 'text-center')}>
            {heading && <h2 className={cn('text-5xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        {items}
      </Container>
    </Section>
  );
};

export { ImageBlocks };
