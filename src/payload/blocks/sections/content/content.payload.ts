import type { Block } from 'payload';
import type { AdminTranslations } from '@/config/store/locales.config';
import thumbnail from './content.webp';

const contentSectionPayloadConfig = {
  slug: 'content',
  interfaceName: 'ContentBlock',
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
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('common:content'),
    },
  ],
} satisfies Block;

export { contentSectionPayloadConfig };
