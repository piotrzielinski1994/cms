import { faqSectionPayloadConfig } from '@/components/sections/faq/faq.payload.config';
import { contactUsSectionPayloadConfig } from '@/components/sections/form/contact-us/contact-us.payload.config';
import { hero1SectionPayloadConfig } from '@/components/sections/hero/hero-1/hero-1.payload.config';
import { imageBlock1BlockPayloadConfig } from '@/components/sections/image-block/image-block-1/image-block-1.payload.config';
import { imageBlocksSectionPayloadConfig } from '@/components/sections/image-block/image-blocks/image-blocks.payload.config';
import type { Page } from '@/payload.types';
import { Hero1Container } from '@/payload/components/hero-1.container';
import { ImageBlock1Container } from '@/payload/components/image-block-1.container';
import { FaqContainer } from '@/payload/components/sections/faq.container';
import { ContactUsContainer } from '@/payload/components/sections/form/contact-us.container';
import { ImageBlocksContainer } from '@/payload/components/sections/image-block/image-blocks.container';

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
