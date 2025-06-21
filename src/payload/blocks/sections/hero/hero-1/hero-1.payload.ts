import { AdminTranslations } from '@/config/locales.config';
import { Block } from 'payload';

const hero1SectionPayloadConfig = {
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

export { hero1SectionPayloadConfig };
