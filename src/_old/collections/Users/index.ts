import type { CollectionConfig } from 'payload';

import { authenticated } from '@/_old/access/authenticated';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      pl: 'Użytkownik',
    },
    plural: {
      en: 'Users',
      pl: 'Użytkownicy',
    },
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
    },
  ],
  timestamps: true,
};
