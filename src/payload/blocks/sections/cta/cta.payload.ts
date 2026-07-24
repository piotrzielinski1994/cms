import type { Block } from 'payload';
import type { AdminTranslations } from '@/config/store/locales.config';
import thumbnail from './cta.webp';

const ctaSectionPayloadConfig = {
  slug: 'cta',
  interfaceName: 'CtaBlock',
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
          relationTo: ['pages'],
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

export { ctaSectionPayloadConfig };
