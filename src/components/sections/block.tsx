import { ContactForm } from '@/components/advanced/form/contact-form/contact-form';
import { contactFormBlockPayloadConfig } from '@/components/advanced/form/contact-form/contact-form.payload.config';
import { Faq } from '@/components/sections/faq/faq';
import { faqSectionPayloadConfig } from '@/components/sections/faq/faq.payload.config';
import { ContactUs } from '@/components/sections/form/contact-us/contact-us';
import { contactUsSectionPayloadConfig } from '@/components/sections/form/contact-us/contact-us.payload.config';
import { hero1SectionPayloadConfig } from '@/components/sections/hero/hero-1/hero-1.payload.config';
import { imageBlock1BlockPayloadConfig } from '@/components/sections/image-block/image-block-1/image-block-1.payload.config';
import { ImageBlocks } from '@/components/sections/image-block/image-blocks/image-blocks';
import { imageBlocksSectionPayloadConfig } from '@/components/sections/image-block/image-blocks/image-blocks.payload.config';
import type { Page } from '@/payload.types';
import { Hero1Container } from '@/payload/components/hero-1.container';
import { ImageBlock1Container } from '@/payload/components/image-block-1.container';

type RenderBlocksProps = {
  blocks: Page['sections'];
};

const blockComponents = {
  [contactFormBlockPayloadConfig.slug]: ContactForm,
  [hero1SectionPayloadConfig.slug]: Hero1Container,
  [imageBlocksSectionPayloadConfig.slug]: ImageBlocks,
  [imageBlock1BlockPayloadConfig.slug]: ImageBlock1Container,
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
