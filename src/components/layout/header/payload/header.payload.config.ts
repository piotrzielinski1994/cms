import type { GlobalConfig } from 'payload';

import { link } from '@/payload/fields/link';
import { revalidateHeader } from './header.payload.hooks';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: 'Layout',
      pl: 'Układ',
    },
  },
  label: {
    en: 'Header',
    pl: 'Nagłówek',
  },
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
