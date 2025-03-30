import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import { Container } from '@/components/layout/container/container';
import { Section } from '@/components/layout/section/section';
import { ImageBlocksBlock } from '@/payload.types';
import { cn } from '@/utils/tailwind';

const ImageBlocks = ({ heading, subheading, items }: ImageBlocksBlock) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section>
      <Container className="grid gap-16">
        {hasHeader && (
          <header className="text-center">
            {heading && <h1 className={cn('text-4xl font-semibold')}>{heading}</h1>}
            {subheading && <p>{subheading}</p>}
          </header>
        )}
        <RenderBlocks blocks={items} />
      </Container>
    </Section>
  );
};

export { ImageBlocks };
