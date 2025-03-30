import { AdminTranslations } from '@/config/locales.config';
import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { createParentField } from '@payloadcms/plugin-nested-docs';
import type { CollectionConfig } from 'payload';

const Categories: CollectionConfig = {
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

export { Categories };
