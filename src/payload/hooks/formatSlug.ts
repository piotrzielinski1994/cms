import type { FieldHook } from 'payload';
import slugify from 'slugify';

const formatSlug =
  (fallback: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') {
      return slugify(value);
    }

    if (operation === 'create') {
      const fallbackData = data?.[fallback] || originalDoc?.[fallback];

      if (fallbackData && typeof fallbackData === 'string') {
        return slugify(fallbackData);
      }
    }

    return value;
  };

export default formatSlug;
