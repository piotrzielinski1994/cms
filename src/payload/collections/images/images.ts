import { anyone } from '@/payload/access/anyone';
import { authenticated } from '@/payload/access/authenticated';
import { AdminTranslations, customTranslations } from '@/payload/locale';
import path from 'path';
import type { CollectionConfig } from 'payload';

const root = path.resolve(process.cwd());

export const Images: CollectionConfig<'images'> = {
  slug: 'images',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:images:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:images:plural'),
  },
  admin: {
    group: {
      en: customTranslations.en.common.files.plural,
      pl: customTranslations.pl.common.files.plural,
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    staticDir: path.join(root, 'public/images'),
    mimeTypes: ['image/*'],
    focalPoint: false,
  },
};