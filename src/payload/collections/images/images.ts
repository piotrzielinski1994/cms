import { AdminTranslations, translations } from '@/config/locales.config';
import { anyone, authenticated } from '@/payload/utils/access';
import path from 'path';
import type { CollectionConfig } from 'payload';

const root = path.resolve(process.cwd());

const Images: CollectionConfig<'images'> = {
  slug: 'images',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:images:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:images:plural'),
  },
  admin: {
    group: {
      en: translations.en.common.files.plural,
      pl: translations.pl.common.files.plural,
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
      localized: true,
    },
  ],
  upload: {
    staticDir: path.join(root, 'public/images'),
    mimeTypes: ['image/*'],
    focalPoint: false,
  },
};

export { Images };
