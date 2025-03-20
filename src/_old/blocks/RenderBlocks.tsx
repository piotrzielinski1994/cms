import React, { Fragment } from 'react';

import type { Page } from '@/payload/payload.types';

import { ArchiveBlock } from '@/_old/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/_old/blocks/CallToAction/Component';
import { ContentBlock } from '@/_old/blocks/Content/Component';
import { FormBlock } from '@/_old/blocks/Form/Component';
import { MediaBlock } from '@/_old/blocks/MediaBlock/Component';
import Hero1 from '@/components/blocks/hero/hero-1/hero-1';
import { hero1BlockPayloadConfig } from '@/components/blocks/hero/hero-1/hero-1.payload.config';
import ImageBlock1 from '@/components/blocks/image-block/image-block-1/image-block-1';
import { imageBlock1BlockPayloadConfig } from '@/components/blocks/image-block/image-block-1/image-block-1.payload.config';
import ImageBlocks from '@/components/blocks/image-block/image-blocks/image-blocks';
import { imageBlocksBlockPayloadConfig } from '@/components/blocks/image-block/image-blocks/image-blocks.payload.config';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  [hero1BlockPayloadConfig.slug]: Hero1,
  [imageBlocksBlockPayloadConfig.slug]: ImageBlocks,
  [imageBlock1BlockPayloadConfig.slug]: ImageBlock1,
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

          return (
            <div className="my-16" key={index}>
              {/* @ts-expect-error there may be some mismatch between the expected types here */}
              <Block {...block} disableInnerContainer />
            </div>
          );
        })}
      </Fragment>
    );
  }

  return null;
};
