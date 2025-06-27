import { RenderBlocks } from '@/components/sections/block';
import { ImageBlocks } from '@/components/sections/image-blocks/image-blocks';
import { ImageBlocksSection } from '@/payload.types';

const ImageBlocksContainer = ({ heading, subheading, items }: ImageBlocksSection) => {
  return (
    <ImageBlocks
      heading={heading ?? undefined}
      subheading={subheading ?? undefined}
      items={[<RenderBlocks key="items" blocks={items} />]}
    />
  );
};

export { ImageBlocksContainer };
