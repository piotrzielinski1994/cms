import type { CollectionConfig } from 'payload';

import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { AdminTranslations } from '@/payload/locale';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:categories:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:categories:plural'),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
};
