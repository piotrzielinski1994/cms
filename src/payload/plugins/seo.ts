import { env } from '@/config/env.config';
import { Page, Post } from '@/payload.types';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types';

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ?? env.pageTitle;
};

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  return doc?.slug ? `${env.publicUrl}/${doc.slug}` : env.publicUrl;
};

const seo = seoPlugin({
  generateTitle,
  generateURL,
});

export { seo };
