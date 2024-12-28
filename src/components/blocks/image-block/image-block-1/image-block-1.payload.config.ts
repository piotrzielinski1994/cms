import { AdminTranslations } from '@/payload/locale';
import type { Block } from 'payload';

export const imageBlock1BlockPayloadConfig = {
  slug: 'image-block-1',
  interfaceName: 'Image Block 1',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:image'),
    },
    {
      name: 'isReversed',
      type: 'checkbox',
      label: ({ t }: { t: AdminTranslations }) => t('fields:isReversed'),
    },
    {
      name: 'heading',
      type: 'text',
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:heading'),
    },
    {
      name: 'subheading',
      type: 'text',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:subheading'),
    },
    {
      name: 'cta',
      type: 'group',
      label: ({ t }: { t: AdminTranslations }) => t('fields:cta'),
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:label'),
        },
        {
          name: 'reference',
          type: 'relationship',
          label: ({ t }: { t: AdminTranslations }) => t('fields:documentToLinkTo'),
          relationTo: ['pages', 'posts'],
          required: true,
        },
        {
          name: 'selector',
          type: 'text',
          label: ({ t }: { t: AdminTranslations }) => t('fields:selector'),
        },
      ],
    },
  ],
} satisfies Block;
