import { ArchiveBlock } from '@/_old/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/_old/blocks/CallToAction/Component';
import { ContentBlock } from '@/_old/blocks/Content/Component';
import { FormBlock } from '@/_old/blocks/Form/Component';
import { MediaBlock } from '@/_old/blocks/MediaBlock/Component';
import Hero1 from '@/components/blocks/hero/hero-1/hero-1';
import ImageBlock1 from '@/components/blocks/image-block/image-block-1/image-block-1';
import ImageBlocks from '@/components/blocks/image-block/image-blocks/image-blocks';
import type * as BlockTypes from '@/payload/payload.types';
import React, { Fragment } from 'react';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'hero-1': Hero1,
  'image-blocks': ImageBlocks,
  'image-block-1': ImageBlock1,
};

export const RenderBlocks: React.FC<{
  blocks: (
    | BlockTypes.Hero1Block
    | BlockTypes.ImageBlocksBlock
    | BlockTypes.ImageBlock1Block
    | BlockTypes.ArchiveBlock
    | BlockTypes.CallToActionBlock
    | BlockTypes.ContentBlock
  )[];
}> = (props) => {
  const { blocks } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                <React.Fragment key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </React.Fragment>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
