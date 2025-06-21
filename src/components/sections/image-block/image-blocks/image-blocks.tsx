import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { cn } from '@/utils/tailwind';
import { ReactNode } from 'react';

type ImageBlocksProps = {
  heading?: string;
  subheading?: string;
  items: ReactNode[];
};

const ImageBlocks = ({ heading, subheading, items }: ImageBlocksProps) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section>
      <Container className="grid gap-16">
        {hasHeader && (
          <header className="text-center">
            {heading && <h2 className={cn('text-4xl font-semibold')}>{heading}</h2>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        {items}
      </Container>
    </Section>
  );
};

export { ImageBlocks };
