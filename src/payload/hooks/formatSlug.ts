import type { FieldHook } from 'payload';
import slugifyFn from 'slugify';

const slugify = (value: string): string => {
  return slugifyFn(value, { lower: true });
};

const formatSlugHook =
  (fallbackField: string): FieldHook =>
  ({ data, operation, originalDoc, value }) => {
    if (typeof value === 'string') return slugify(value);
    if (operation !== 'create') return value;
    const fallbackData = data?.[fallbackField] || originalDoc?.[fallbackField];
    return typeof fallbackData === 'string' ? slugify(fallbackData) : value;
  };

export { formatSlugHook, slugify };
