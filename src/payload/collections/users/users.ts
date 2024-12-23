import type { CollectionConfig } from 'payload';

import { authenticated } from '@/payload/access/authenticated';
import { AdminTranslations } from '@/payload/locale';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:users:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:users:plural'),
  },
  access: {
    admin: authenticated,
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      label: ({ t }: { t: AdminTranslations }) => t('fields:fullName'),
    },
  ],
  timestamps: true,
};
