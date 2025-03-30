import { AdminTranslations } from '@/config/locales.config';
import type { Block } from 'payload';

export const imageBlock1BlockPayloadConfig = {
  slug: 'image-block-1',
  interfaceName: 'ImageBlock1Block',
  fields: [
    {
      name: 'image',
      type: 'group',
      label: ({ t }: { t: AdminTranslations }) => t('fields:image'),
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'default',
              type: 'upload',
              relationTo: 'images',
              required: true,
              label: ({ t }: { t: AdminTranslations }) => t('common:default'),
              admin: {
                width: '50%',
              },
            },
            {
              name: 'dark',
              type: 'upload',
              relationTo: 'images',
              label: ({ t }: { t: AdminTranslations }) => t('common:dark'),
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
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
      name: 'buttons',
      type: 'array',
      label: ({ t }: { t: AdminTranslations }) => t('fields:buttons'),
      admin: {
        initCollapsed: true,
      },
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
