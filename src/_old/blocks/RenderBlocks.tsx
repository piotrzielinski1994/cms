import React, { Fragment } from 'react';

import type { Page } from '@/payload/payload.types';

import { ArchiveBlock } from '@/_old/blocks/ArchiveBlock/Component';
import { CallToActionBlock } from '@/_old/blocks/CallToAction/Component';
import { ContentBlock } from '@/_old/blocks/Content/Component';
import { FormBlock } from '@/_old/blocks/Form/Component';
import { MediaBlock } from '@/_old/blocks/MediaBlock/Component';
import Hero1 from '@/components/blocks/hero/hero-1/hero-1';

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  'hero-1': Hero1,
};

export const RenderBlocks: React.FC<{
  blocks: Page['sections'];
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
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
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
