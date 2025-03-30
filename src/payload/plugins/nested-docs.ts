import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs';

const nestedDocs = nestedDocsPlugin({
  collections: ['pages', 'categories'],
  generateURL: (docs) =>
    docs.reduce((url, { slug }) => {
      const withoutTrailingSlash = url.endsWith('/') ? url.slice(0, -1) : url;
      return `${withoutTrailingSlash}/${slug}`;
    }, ''),
});

export { nestedDocs };
