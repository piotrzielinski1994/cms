import { AdminTranslations, translations } from '@/config/locales.config';
import { link } from '@/payload/fields/link';
import type { GlobalConfig } from 'payload';
import { revalidateFooter } from './footer.hooks';

const footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: translations.en.common.component.plural,
      pl: translations.pl.common.component.plural,
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
          RowLabel: '@/payload/components/row-label#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};

export { footer };
