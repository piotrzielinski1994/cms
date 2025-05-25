import { AdminTranslations, translations } from '@/config/locales.config';
import { rebuildTag } from '@/utils/next';
import { isLocale } from '@/utils/payload';
import type { GlobalConfig } from 'payload';

const cookiesBanner: GlobalConfig = {
  slug: 'cookies-banner',
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: translations.en.common.component.plural,
      pl: translations.pl.common.component.plural,
    },
  },
  label: ({ t }: { t: AdminTranslations }) => t('components:cookiesBanner'),
  fields: [
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('common:content'),
    },
    {
      name: 'accept',
      type: 'text',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:acceptLabel'),
      admin: {
        width: '50%',
      },
    },

    {
      name: 'readMore',
      type: 'group',
      label: ({ t }: { t: AdminTranslations }) => t('fields:readMoreLabel'),
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              localized: true,
              label: ({ t }: { t: AdminTranslations }) => t('fields:label'),
              admin: {
                width: '50%',
              },
            },
            {
              name: 'url',
              type: 'text',
              required: true,
              localized: true,
              label: ({ t }: { t: AdminTranslations }) => t('fields:url'),
              admin: {
                width: '50%',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req }) => {
        if (!req.context.disableRevalidate && isLocale(req.locale)) {
          req.payload.logger.info(`Revalidating cookies banner`);
          rebuildTag(`global__${req.locale}__cookies-banner`);
        }

        return doc;
      },
    ],
  },
};

export { cookiesBanner };
