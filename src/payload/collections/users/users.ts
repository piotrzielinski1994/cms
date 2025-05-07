import type { CollectionConfig } from 'payload';

import { AdminTranslations } from '@/config/locales.config';
import { admin, adminOrSelf } from '@/payload/utils/access';

const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:users:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:users:plural'),
  },
  access: {
    create: admin,
    read: adminOrSelf,
    update: adminOrSelf,
    delete: admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    // This property controls how deeply "populated"
    // relationship docs are that are stored in the req.user.
    // It should be kept to as low as possible, which
    // keeps performance fast.
    depth: 0,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: ({ t }: { t: AdminTranslations }) => t('fields:fullName'),
    },
    {
      name: 'roles',
      saveToJWT: true,
      type: 'select',
      label: ({ t }: { t: AdminTranslations }) => t('fields:role:plural'),
      hasMany: true,
      defaultValue: ['user'],
      // access: {
      //   create: admin,
      //   read: admin,
      //   update: admin,
      // },
      options: [
        {
          label: ({ t }: { t: AdminTranslations }) => t('enums:role:user'),
          value: 'user',
        },
        {
          label: ({ t }: { t: AdminTranslations }) => t('enums:role:editor'),
          value: 'editor',
        },
        {
          label: ({ t }: { t: AdminTranslations }) => t('enums:role:admin'),
          value: 'admin',
        },
      ],
    },
  ],
  timestamps: true,
};

export { Users };
