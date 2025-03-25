import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { ImageBlocksProps } from './image-blocks.types';

const ImageBlocks = (props: ImageBlocksProps) => {
  return (
    <Section>
      <Container className="bg-gray-100 grid gap-8">
        <RenderBlocks blocks={props.items ?? []} />
      </Container>
    </Section>
  );
};

export default ImageBlocks;
