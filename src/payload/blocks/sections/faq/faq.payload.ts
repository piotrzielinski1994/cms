import { AdminTranslations } from '@/config/locales.config';
import { Block } from 'payload';
import thumbnail from './faq.webp';

const faqSectionPayloadConfig = {
  slug: 'faq',
  interfaceName: 'FAQ',
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
      type: 'array',
      label: ({ t }: { t: AdminTranslations }) => t('common:item:plural'),
      labels: {
        singular: ({ t }: { t: AdminTranslations }) => t('common:item:singular'),
        plural: ({ t }: { t: AdminTranslations }) => t('common:item:plural'),
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('common:question'),
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('common:answer'),
        },
      ],
    },
  ],
} satisfies Block;

export { faqSectionPayloadConfig };
