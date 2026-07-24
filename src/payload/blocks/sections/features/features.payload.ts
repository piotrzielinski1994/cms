import type { Block } from 'payload';
import type { IconName } from '@/components/sections/features/features';
import type { AdminTranslations } from '@/config/store/locales.config';
import thumbnail from './features.webp';

const iconOptions: Array<{ label: string; value: IconName }> = [
  { label: 'Rocket', value: 'rocket' },
  { label: 'Zap', value: 'zap' },
  { label: 'Shield', value: 'shield' },
  { label: 'Sparkles', value: 'sparkles' },
  { label: 'Heart', value: 'heart' },
  { label: 'Star', value: 'star' },
  { label: 'Settings', value: 'settings' },
  { label: 'Globe', value: 'globe' },
  { label: 'Lock', value: 'lock' },
  { label: 'Gauge', value: 'gauge' },
];

const featuresSectionPayloadConfig = {
  slug: 'features',
  interfaceName: 'FeaturesBlock',
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
          name: 'icon',
          type: 'select',
          options: iconOptions,
          label: ({ t }: { t: AdminTranslations }) => t('fields:icon'),
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:title'),
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: ({ t }: { t: AdminTranslations }) => t('fields:description'),
        },
      ],
    },
  ],
} satisfies Block;

export { featuresSectionPayloadConfig };
