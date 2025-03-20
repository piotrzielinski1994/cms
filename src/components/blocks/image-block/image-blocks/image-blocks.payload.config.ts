import { imageBlock1BlockPayloadConfig } from '@/components/blocks/image-block/image-block-1/image-block-1.payload.config';
import { AdminTranslations } from '@/payload/locale';
import type { Block } from 'payload';

export const imageBlocksBlockPayloadConfig = {
  slug: 'image-blocks',
  interfaceName: 'ImageBlocksBlock',
  fields: [
    {
      name: 'items',
      type: 'blocks',
      blocks: [imageBlock1BlockPayloadConfig],
      required: true,
      admin: {
        initCollapsed: true,
      },
      label: ({ t }: { t: AdminTranslations }) => t('common:item:plural'),
    },
  ],
} satisfies Block;
