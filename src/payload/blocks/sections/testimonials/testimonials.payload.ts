import type { Block } from 'payload';
import type { AdminTranslations } from '@/config/store/locales.config';
import thumbnail from './testimonials.webp';

const testimonialsSectionPayloadConfig = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
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
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'images',
          required: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:image'),
        },
        {
          name: 'quote',
          type: 'textarea',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:quote'),
        },
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:fullName'),
        },
        {
          name: 'annotation',
          type: 'text',
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:annotation'),
        },
      ],
    },
  ],
} satisfies Block;

export { testimonialsSectionPayloadConfig };
