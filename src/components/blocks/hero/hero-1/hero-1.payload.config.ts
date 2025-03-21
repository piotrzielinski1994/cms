import { AdminTranslations } from '@/payload/locale';
import type { Block } from 'payload';

export const hero1BlockPayloadConfig = {
  slug: 'hero-1',
  interfaceName: 'Hero1Block',
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
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:subheading'),
    },
    {
      name: 'cta',
      type: 'group',
      label: ({ t }: { t: AdminTranslations }) => t('fields:cta'),
      admin: {
        condition: () => false, // TODO: This hides the field unless explicitly enabled
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          // TODO: required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:label'),
        },
        {
          name: 'reference',
          type: 'relationship',
          label: ({ t }: { t: AdminTranslations }) => t('fields:documentToLinkTo'),
          relationTo: ['pages', 'posts'],
          // TODO: required: true,
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
