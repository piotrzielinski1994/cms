import { AdminTranslations, translations } from '@/config/locales.config';
import { link } from '@/payload/fields/link';
import type { GlobalConfig } from 'payload';
import { revalidateHeader } from './cookies-banner.hooks';

const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: translations.en.common.layout,
      pl: translations.pl.common.layout,
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
