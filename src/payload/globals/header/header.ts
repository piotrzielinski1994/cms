import { AdminTranslations, customTranslations } from '@/config/locales.config';
import { link } from '@/payload/fields/link';
import type { GlobalConfig } from 'payload';
import { revalidateHeader } from './header.hooks';

const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: customTranslations.en.common.layout,
      pl: customTranslations.pl.common.layout,
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
          RowLabel: '@/payload/components/row-label#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};

export { Header };
