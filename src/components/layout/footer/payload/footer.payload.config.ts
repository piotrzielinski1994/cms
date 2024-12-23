import type { GlobalConfig } from 'payload';

import { link } from '@/payload/fields/link';
import { AdminTranslations, customTranslations } from '@/payload/locale';
import { revalidateFooter } from './footer.payload.hooks';

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: customTranslations.en.groups.layout,
      pl: customTranslations.pl.groups.layout,
    },
  },
  label: ({ t }: { t: AdminTranslations }) => t('components:footer'),
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
