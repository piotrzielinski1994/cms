import type { GlobalConfig } from 'payload';

import { link } from '@/payload/fields/link';
import { AdminTranslations, adminLocale } from '@/payload/locale';
import { revalidateHeader } from './header.payload.hooks';

export const headerPayloadConfig: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: adminLocale.customList.en.common.layout,
      pl: adminLocale.customList.pl.common.layout,
    },
  },
  label: ({ t }: { t: AdminTranslations }) => t('components:header'),
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: ({ t }: { t: AdminTranslations }) => t('fields:menu'),
      fields: [
        link({
          appearances: false,
          depth: 1,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/layout/header/payload/row-label.payload.component#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
