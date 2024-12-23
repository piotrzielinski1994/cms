import type { CollectionConfig } from 'payload';

import { anyone } from '@/_old/access/anyone';
import { authenticated } from '@/_old/access/authenticated';

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      pl: 'Kategoria',
    },
    plural: {
      en: 'Categories',
      pl: 'Kategorie',
    },
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
