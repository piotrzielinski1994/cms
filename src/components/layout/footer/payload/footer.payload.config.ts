import type { GlobalConfig } from 'payload';

import { link } from '@/_old/fields/link';
import { revalidateFooter } from './footer.payload.hooks';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: 'Layout',
      pl: 'Układ',
    },
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
          RowLabel: '@/components/layout/footer/payload/row-label.payload.component#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
