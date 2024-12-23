import type { GlobalConfig } from 'payload';

import { link } from '@/_old/fields/link';
import { revalidateHeader } from './header.payload.hooks';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
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
          RowLabel: '@/components/layout/header/payload/row-label.payload.component',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
