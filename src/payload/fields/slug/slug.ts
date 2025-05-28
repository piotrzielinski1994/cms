import { formatSlugHook } from '@/payload/hooks/formatSlug';
import type { CheckboxField, TextField } from 'payload';

// Types ====================================

type SlugConfig = {
  fieldToUse?: string;
  name?: string;
  overrides?: {
    slug?: Partial<TextField>;
    checkbox?: Partial<CheckboxField>;
  };
};

// Variables ====================================

const createSlugField = ({ fieldToUse = 'title', name = 'slug', overrides }: SlugConfig = {}): [
  TextField,
  CheckboxField,
] => {
  const checkBoxField: CheckboxField = {
    name: `${name}Lock`,
    type: 'checkbox',
    defaultValue: true,
    admin: {
      hidden: true,
      position: 'sidebar',
    },
    ...overrides?.checkbox,
  };

  const slugField: TextField = {
    ...((overrides?.slug as TextField) ?? {}),
    name,
    type: 'text',
    unique: true,
    localized: true,
    index: true,
    hooks: {
      beforeValidate: [formatSlugHook(fieldToUse)],
    },
    admin: {
      position: 'sidebar',
      ...(overrides?.slug?.admin || {}),
      components: {
        Field: {
          path: '@/payload/components/computed-field#ComputedField',
          clientProps: {
            fieldToUse,
            checkboxFieldPath: checkBoxField.name,
            formatter: 'toSlug',
          },
        },
      },
    },
  };

  return [slugField, checkBoxField];
};

export { createSlugField };
