import { AdminTranslations, translations } from '@/config/locales.config';
import type { GlobalConfig } from 'payload';
import { revalidateCookiesBanner } from './cookies-banner.hooks';

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
    afterChange: [revalidateCookiesBanner],
  },
};

export { cookiesBanner };
