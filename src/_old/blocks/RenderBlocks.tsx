import React, { Fragment } from 'react';

import type { Page } from '@/payload.types';

import { ArchiveBlock } from '@/_old/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/_old/blocks/CallToAction/Component';
import { ContentBlock } from '@/_old/blocks/Content/Component';
import { FormBlock } from '@/_old/blocks/Form/Component';
import { MediaBlock } from '@/_old/blocks/MediaBlock/Component';
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

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  [contactFormBlockPayloadConfig.slug]: ContactForm,
  [hero1SectionPayloadConfig.slug]: Hero1,
  [imageBlocksSectionPayloadConfig.slug]: ImageBlocks,
  [imageBlock1BlockPayloadConfig.slug]: ImageBlock1,
  [contactUsSectionPayloadConfig.slug]: ContactUs,
  [faqSectionPayloadConfig.slug]: Faq,
};

export const RenderBlocks: React.FC<{
  blocks: Page['sections'][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;
          if (!(blockType in blockComponents)) {
            return null;
          }

          const Block = blockComponents[blockType];

          if (!Block) {
            return null;
          }

          /* @ts-expect-error there may be some mismatch between the expected types here */
          return <Block key={index} {...block} disableInnerContainer />;
        })}
      </Fragment>
    );
  }

  return null;
};
