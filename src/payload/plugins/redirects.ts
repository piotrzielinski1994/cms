import { revalidateRedirects } from '@/payload/hooks/revalidateRedirects';
import { adminLocale, AdminTranslations } from '@/payload/locale';
import { redirectsPlugin } from '@payloadcms/plugin-redirects';

export const redirects = redirectsPlugin({
  collections: ['pages', 'posts'],
  overrides: {
    admin: {
      group: {
        en: adminLocale.customList.en.groups.admin,
        pl: adminLocale.customList.pl.groups.admin,
      },
    },
    labels: {
      singular: ({ t }: { t: AdminTranslations }) => t('collections:redirects:singular'),
      plural: ({ t }: { t: AdminTranslations }) => t('collections:redirects:plural'),
    },
    // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
    fields: ({ defaultFields }) => {
      return defaultFields.map((field) => {
        if ('name' in field && field.name === 'from') {
          return {
            ...field,
            admin: {
              description: 'You will need to rebuild the website when changing this field.',
            },
          };
        }
        return field;
      });
    },
    hooks: {
      afterChange: [revalidateRedirects],
    },
  },
});
