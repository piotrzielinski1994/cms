import type { CollectionBeforeChangeHook } from 'payload';

const populatePublishedAt: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (!['create', 'update'].includes(operation)) return data;
  if (!req.data || req.data.publishedAt) return data;
  return { ...data, publishedAt: new Date() };
};

export { populatePublishedAt };
