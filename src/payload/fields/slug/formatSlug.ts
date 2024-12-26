import type { FieldHook } from 'payload';
import slugify from 'slugify';

export const formatSlug = (value: string): string => {
  return slugify(value, { lower: true });
};

export const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return slugify(value);
    }

    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback] || data?.[fallback];

      if (fallbackData && typeof fallbackData === 'string') {
        return slugify(fallbackData);
      }
    }

    return value;
  };
