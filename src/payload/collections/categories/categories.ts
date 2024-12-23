import type { CollectionConfig } from 'payload';

import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { AdminTranslations } from '@/payload/locale';
import { createParentField } from '@payloadcms/plugin-nested-docs';

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
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:title'),
    },
    createParentField('categories', {
      label: ({ t }: { t: AdminTranslations }) => t('fields:parent'),
    }),
  ],
};
