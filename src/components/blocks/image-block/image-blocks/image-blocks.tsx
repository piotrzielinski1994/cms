import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { ImageBlocksProps } from './image-blocks.types';
import { cn } from '@/_old/utilities/ui';

const ImageBlocks = ({ heading, subheading, items }: ImageBlocksProps) => {
  const hasHeader = Boolean(heading || subheading);
  return (
    <Section>
      <Container className="bg-gray-100 grid gap-8">
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

export default ImageBlocks;
