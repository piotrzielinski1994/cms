import deepMerge from '@/_old/utilities/deepMerge';
import { AdminTranslations } from '@/config/locales.config';
import type { Field } from 'payload';
export type LinkAppearances = 'default' | 'outline';

// Types ====================================

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false;
  disableLabel?: boolean;
  overrides?: Record<string, unknown>;
  depth?: number;
}) => Field;

// Variables ====================================

const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  outline: {
    label: 'Outline',
    value: 'outline',
  },
};

const link: LinkType = ({ depth = 0, appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'link',
    type: 'group',
    label: ({ t }: { t: AdminTranslations }) => t('fields:type'),
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            label: ({ t }: { t: AdminTranslations }) => t('fields:navItem'),
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: ({ t }: { t: AdminTranslations }) => t('fields:internalLink'),
                value: 'reference',
              },
              {
                label: ({ t }: { t: AdminTranslations }) => t('fields:customURL'),
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: ({ t }: { t: AdminTranslations }) => t('common:openInNewTab'),
          },
        ],
      },
    ],
  };

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: ({ t }: { t: AdminTranslations }) => t('fields:documentToLinkTo'),
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: ({ t }: { t: AdminTranslations }) => t('fields:customURL'),
      required: true,
    },
  ];

  if (!disableLabel) {
    linkTypes.map((linkType) => ({
      ...linkType,
      admin: {
        ...linkType.admin,
        width: '50%',
      },
    }));

    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: ({ t }: { t: AdminTranslations }) => t('fields:label'),
          required: true,
          localized: true,
        },
      ],
    });
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes];
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.outline];

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance]);
    }

    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    });
  }

  if (depth > 0) {
    linkResult.fields.push({
      name: 'navItems',
      type: 'array',
      label: ({ t }: { t: AdminTranslations }) => t('fields:submenu'),
      fields: [
        link({
          appearances: false,
          depth: depth - 1,
        }),
      ],
      maxRows: 6,
      admin: {
        style: {
          paddingLeft: 200,
        },
        initCollapsed: true,
        components: {
          RowLabel: '@/payload/components/row-label#RowLabel',
        },
      },
    });
  }

  return deepMerge(linkResult, overrides);
};

export { appearanceOptions, link };
