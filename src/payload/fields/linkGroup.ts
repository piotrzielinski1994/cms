import deepMerge from '@/payload/_old/utilities/deepMerge';
import type { ArrayField, Field } from 'payload';
import type { LinkAppearances } from './link';
import { link } from './link';

type LinkGroupType = (options?: {
  appearances?: LinkAppearances[] | false;
  overrides?: Partial<ArrayField>;
}) => Field;

const linkGroup: LinkGroupType = ({ appearances, overrides = {} } = {}) => {
  const generatedLinkGroup: Field = {
    name: 'links',
    type: 'array',
    fields: [
      link({
        appearances,
      }),
    ],
    admin: {
      initCollapsed: true,
    },
  };

  return deepMerge(generatedLinkGroup, overrides);
};

export { linkGroup };
