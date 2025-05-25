import { clientEnv } from '@/config/env.client.config';
import { Page } from '@/payload.types';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';

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
