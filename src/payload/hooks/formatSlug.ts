import type { FieldHook } from 'payload';
import slugify from 'slugify';

const format = (value: string): string => {
  return slugify(value, { lower: true });
};

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') return format(value);
    if (operation !== 'create') return value;

    const fallbackData = data?.[fallback] || originalDoc?.[fallback];
    if (fallbackData && typeof fallbackData === 'string') {
      return format(fallbackData);
    }

    return value;
  };

export { format, formatSlug };
