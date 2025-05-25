import { Container } from '@/components/basic/container';
import { Section } from '@/components/basic/section';
import { RenderBlocks } from '@/components/sections/block';
import { ImageBlocksSection } from '@/payload.types';
import { cn } from '@/utils/tailwind';

const ImageBlocks = ({ heading, subheading, items }: ImageBlocksSection) => {
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
        <RenderBlocks blocks={items} />
      </Container>
    </Section>
  );
};

export { ImageBlocks };
