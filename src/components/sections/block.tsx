import { ContactForm } from '@/components/advanced/form/contact-form/contact-form';
import { contactFormBlockPayloadConfig } from '@/components/advanced/form/contact-form/contact-form.payload.config';
import { Faq } from '@/components/sections/faq/faq';
import { faqSectionPayloadConfig } from '@/components/sections/faq/faq.payload.config';
import { ContactUs } from '@/components/sections/form/contact-us/contact-us';
import { contactUsSectionPayloadConfig } from '@/components/sections/form/contact-us/contact-us.payload.config';
import { Hero1 } from '@/components/sections/hero/hero-1/hero-1';
import { hero1SectionPayloadConfig } from '@/components/sections/hero/hero-1/hero-1.payload.config';
import { ImageBlock1 } from '@/components/sections/image-block/image-block-1/image-block-1';
import { imageBlock1BlockPayloadConfig } from '@/components/sections/image-block/image-block-1/image-block-1.payload.config';
import { ImageBlocks } from '@/components/sections/image-block/image-blocks/image-blocks';
import { imageBlocksSectionPayloadConfig } from '@/components/sections/image-block/image-blocks/image-blocks.payload.config';
import type { Page } from '@/payload.types';

type RenderBlocksProps = {
  blocks: Page['sections'];
};

const blockComponents = {
  [contactFormBlockPayloadConfig.slug]: ContactForm,
  [hero1SectionPayloadConfig.slug]: Hero1,
  [imageBlocksSectionPayloadConfig.slug]: ImageBlocks,
  [imageBlock1BlockPayloadConfig.slug]: ImageBlock1,
  [contactUsSectionPayloadConfig.slug]: ContactUs,
  [faqSectionPayloadConfig.slug]: Faq,
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
