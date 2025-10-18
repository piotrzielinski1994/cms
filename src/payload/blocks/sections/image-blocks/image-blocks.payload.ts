import { AdminTranslations } from '@/config/store/locales.config';
import { imageBlock1BlockPayloadConfig } from '@/payload/blocks/advanced/image-block/image-block.payload';
import { Block } from 'payload';
import thumbnail from './image-blocks.webp';

const imageBlocksSectionPayloadConfig = {
  slug: 'image-blocks',
  interfaceName: 'ImageBlocksSection',
  imageURL: thumbnail.src,
  fields: [
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:heading'),
    },
    {
      name: 'subheading',
      type: 'text',
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:subheading'),
    },
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

export { imageBlocksSectionPayloadConfig };
