import { RenderBlocks } from '@/_old/blocks/RenderBlocks';
import Container from '@/components/layout/container/container';
import Section from '@/components/layout/section/section';
import { ImageBlocksProps } from './image-blocks.types';

const ImageBlocks = (props: ImageBlocksProps) => {
  return (
    <Section>
      <Container className="border-2 border-gray-600">
        <RenderBlocks blocks={props.items ?? []} />
      </Container>
    </Section>
  );
};

export default ImageBlocks;
