import { clientEnv } from '@/config/env.client.config';
import { serverEnv } from '@/config/env.server.config';
import {
  adminLocales,
  contentLocales,
  defaultAdminLocale,
  defaultContentLocale,
  translations,
} from '@/config/store/locales.config';
import { collections } from '@/payload/collections';
import { defaultLexical } from '@/payload/fields/defaultLexical';
import { cookiesBanner } from '@/payload/globals/cookies-banner/cookies-banner';
import { footer } from '@/payload/globals/footer/footer';
import { header } from '@/payload/globals/header/header';
import { plugins } from '@/payload/plugins';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import path from 'path';
import { buildConfig } from 'payload';
import { values } from 'ramda';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const payloadConfig = buildConfig({
  i18n: {
    supportedLanguages: adminLocales,
    fallbackLanguage: defaultAdminLocale,
    translations: translations,
  },
  localization: {
    locales: contentLocales,
    defaultLocale: defaultContentLocale,
  },
  admin: {
    components: {
      afterNavLinks: [
        {
          path: '@/payload/components/docs-link#DocsLink',
        },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: collections.Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: serverEnv.dbUri,
  }),
  collections: values(collections),
  cors: [clientEnv.publicUrl],
  globals: [header, footer, cookiesBanner],
  plugins: values(plugins),
  secret: serverEnv.payloadSecret,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
});

export default payloadConfig;
