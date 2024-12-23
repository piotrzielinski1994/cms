import { AdminTranslations } from '@/payload/locale';
import type { Block } from 'payload';

export const hero1BlockConfig = {
  slug: 'hero-1',
  interfaceName: 'Hero 1',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:heading'),
    },
  ],
} satisfies Block;
