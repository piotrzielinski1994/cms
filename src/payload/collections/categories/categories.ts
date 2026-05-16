import { AdminTranslations } from '@/config/store/locales.config';
import { createSlugField } from '@/payload/fields/slug/slug';
import { admin, anyone } from '@/payload/utils/access';
import type { CollectionConfig } from 'payload';

const Categories: CollectionConfig<'categories'> = {
  slug: 'categories',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:categories:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:categories:plural'),
  },
  access: {
    create: admin,
    delete: admin,
    read: anyone,
    update: admin,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:title'),
    },
    ...createSlugField(),
  ],
};

export { Categories };
