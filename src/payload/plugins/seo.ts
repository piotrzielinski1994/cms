import { seoPlugin } from '@payloadcms/plugin-seo';
import type { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';
import { clientEnv } from '@/config/env.client.config';
import type { Page } from '@/payload.types';

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ?? clientEnv.siteName;
};

const generateURL: GenerateURL<Page> = ({ doc }) => {
  return doc?.slug ? `${clientEnv.publicUrl}/${doc.slug}` : clientEnv.publicUrl;
};

const seo = seoPlugin({
  generateTitle,
  generateURL,
});

export { seo };
