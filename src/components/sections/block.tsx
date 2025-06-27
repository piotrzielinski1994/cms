import type { Page } from '@/payload.types';
import { ImageBlock1Container } from '@/payload/blocks/advanced/image-block/image-block.container';
import { imageBlock1BlockPayloadConfig } from '@/payload/blocks/advanced/image-block/image-block.payload';
import { FaqContainer } from '@/payload/blocks/sections/faq/faq.container';
import { faqSectionPayloadConfig } from '@/payload/blocks/sections/faq/faq.payload';
import { ContactUsContainer } from '@/payload/blocks/sections/form/contact-us/contact-us.container';
import { contactUsSectionPayloadConfig } from '@/payload/blocks/sections/form/contact-us/contact-us.payload';
import { Hero1Container } from '@/payload/blocks/sections/hero/hero-1/hero-1.container';
import { hero1SectionPayloadConfig } from '@/payload/blocks/sections/hero/hero-1/hero-1.payload';
import { ImageBlocksContainer } from '@/payload/blocks/sections/image-blocks/image-blocks.container';
import { imageBlocksSectionPayloadConfig } from '@/payload/blocks/sections/image-blocks/image-blocks.payload';

type RenderBlocksProps = {
  blocks: Page['sections'];
};

const blockComponents = {
  [hero1SectionPayloadConfig.slug]: Hero1Container,
  [imageBlocksSectionPayloadConfig.slug]: ImageBlocksContainer,
  [imageBlock1BlockPayloadConfig.slug]: ImageBlock1Container,
  [contactUsSectionPayloadConfig.slug]: ContactUsContainer,
  [faqSectionPayloadConfig.slug]: FaqContainer,
};

const RenderBlocks = ({ blocks }: RenderBlocksProps) => {
  return (
    <>
      {blocks.map((block, index) => {
        const Block = blockComponents[block.blockType];
        if (!Block) return null;
        /* @ts-expect-error there may be some mismatch between the expected types here */
        return <Block key={index} {...block} disableInnerContainer />;
      })}
    </>
  );
};

export { RenderBlocks };
