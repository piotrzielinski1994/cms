import type { CollectionConfig } from 'payload';

import { access } from '@/payload/access';
import { AdminTranslations } from '@/payload/locale';

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:users:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:users:plural'),
  },
  access: {
    create: access.admin,
    read: access.adminOrSelf,
    update: access.adminOrSelf,
    delete: access.admin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  // auth: true,
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
      access: {
        create: access.admin,
        read: access.admin,
        update: access.admin,
      },
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
