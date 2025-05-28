import { AdminTranslations, translations } from '@/config/locales.config';
import { link } from '@/payload/fields/link';
import { rebuildTag } from '@/utils/next';
import { isCollectionLocale } from '@/utils/payload';
import type { GlobalConfig } from 'payload';

const header = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: translations.en.common.component.plural,
      pl: translations.pl.common.component.plural,
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
    afterChange: [
      ({ doc, req: { payload, context, locale } }) => {
        if (!context.disableRevalidate && isCollectionLocale(locale)) {
          payload.logger.info(`Revalidating header`);
          rebuildTag(`global__${locale}__header`);
        }

        return doc;
      },
    ],
  },
} satisfies GlobalConfig;

export { header };
