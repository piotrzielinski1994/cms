import { searchPlugin } from '@payloadcms/plugin-search';

const search = searchPlugin({
  collections: [],
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields];
    },
  },
});

export { search };
