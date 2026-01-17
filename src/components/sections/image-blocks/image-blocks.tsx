import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { HTMLAttributes, ReactNode } from 'react';

type ImageBlocksProps = HTMLAttributes<HTMLElement> & {
  heading?: string;
  subheading?: string;
  items: ReactNode[];
};

const ImageBlocks = ({ heading, subheading, items, ...props }: ImageBlocksProps) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section {...props}>
      <Container className="grid gap-8">
        {hasHeader && (
          <header className="text-center">
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
