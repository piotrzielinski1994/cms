import { getServerSideURL } from '@/_old/utilities/getURL';
import { Footer } from '@/components/layout/footer/payload/footer.payload.config';
import { Header } from '@/components/layout/header/payload/header.payload.config';
import { collections } from '@/payload/collections';
import { defaultLexical } from '@/payload/fields/defaultLexical';
import { adminLocale, contentLocale, customTranslations } from '@/payload/locale';
import { plugins } from '@/payload/plugins';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  i18n: {
    supportedLanguages: adminLocale.list,
    fallbackLanguage: adminLocale.default,
    translations: customTranslations,
  },
  localization: {
    locales: contentLocale.list,
    defaultLocale: contentLocale.default,
  },
  admin: {
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ['@/_old/components/BeforeLogin'],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/_old/components/BeforeDashboard'],
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
    url: process.env.DATABASE_URI || '',
  }),
  collections: Object.values(collections),
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: Object.values(plugins),
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload.types.ts'),
  },
});
