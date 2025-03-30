import { beforeSyncWithSearch } from '@/_old/search/beforeSync';
import { searchFields } from '@/_old/search/fieldOverrides';
import { searchPlugin } from '@payloadcms/plugin-search';

const search = searchPlugin({
  collections: ['posts'],
  beforeSync: beforeSyncWithSearch,
  searchOverrides: {
    fields: ({ defaultFields }) => {
      return [...defaultFields, ...searchFields];
    },
  },
});

export { search };
