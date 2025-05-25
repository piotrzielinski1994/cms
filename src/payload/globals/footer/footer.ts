import { AdminTranslations, translations } from '@/config/locales.config';
import { link } from '@/payload/fields/link';
import { isLocale } from '@/utils/payload';
import { revalidateTag } from 'next/cache';
import type { GlobalConfig } from 'payload';

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
    afterChange: [
      ({ doc, req: { payload, context, locale } }) => {
        if (!context.disableRevalidate && isLocale(locale)) {
          payload.logger.info(`Revalidating footer`);
          revalidateTag(`global__${locale}__footer`);
        }

        return doc;
      },
    ],
  },
};

export { footer };
