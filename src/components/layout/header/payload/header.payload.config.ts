import type { GlobalConfig } from 'payload';

import { link } from '@/payload/fields/link';
import { AdminTranslations, customTranslations } from '@/payload/locale';
import { revalidateHeader } from './header.payload.hooks';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: customTranslations.en.groups.layout,
      pl: customTranslations.pl.groups.layout,
    },
  },
  label: ({ t }: { t: AdminTranslations }) => t('components:header'),
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
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
