import type { FieldHook } from 'payload';
import slugify from 'slugify';

const formatSlug = (value: string): string => {
  return slugify(value, { lower: true });
};

const formatSlugHook =
  (fieldToUse: string): FieldHook =>
  ({ data, operation, value }) => {
    const fallbackData = data?.[fieldToUse];
    if (typeof value === 'string') return slugify(value);
    if (operation !== 'create' && !!data?.slug) return value;
    return typeof fallbackData === 'string' ? slugify(fallbackData) : value;
  };

export { formatSlug, formatSlugHook };
