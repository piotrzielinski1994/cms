import { RenderBlocks } from '@/components/sections/block';
import { ImageBlocks } from '@/components/sections/image-blocks/image-blocks';
import { ImageBlocksSection } from '@/payload.types';

type ImageBlocksContainerProps = ImageBlocksSection;

const ImageBlocksContainer = ({ heading, subheading, items }: ImageBlocksContainerProps) => {
  return (
    <ImageBlocks
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      items={[<RenderBlocks key="items" blocks={items} />]}
    />
  );
};

export { ImageBlocksContainer };
