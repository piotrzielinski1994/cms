import { translations } from '@/config/store/locales.config';
import { generatePreviewPath } from '@/payload/_old/utilities/generatePreviewPath';
import { createSlugField } from '@/payload/fields/slug/slug';
import { populatePublishedAt } from '@/payload/hooks/populatePublishedAt';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical';
import type { CollectionOverride } from '@payloadcms/plugin-ecommerce/types';
import type { DefaultDocumentIDType, Where } from 'payload';
import { revalidateProduct, revalidateProductDelete } from './hooks/revalidateProduct';

const ProductsCollection: CollectionOverride = ({ defaultCollection }) => ({
  ...defaultCollection,
  admin: {
    ...defaultCollection?.admin,
    defaultColumns: ['title', 'enableVariants', '_status', 'variants.variants'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'products',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'products',
        req,
      }),
    useAsTitle: 'title',
  },
  defaultPopulate: {
    ...defaultCollection?.defaultPopulate,
    title: true,
    slug: true,
    variantOptions: true,
    variants: true,
    enableVariants: true,
    gallery: true,
    priceInUSD: true,
    inventory: true,
    meta: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: translations.en.fields.title,
        pl: translations.pl.fields.title,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'description',
              type: 'richText',
              localized: true,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ];
                },
              }),
              label: false,
              required: false,
            },
            {
              name: 'gallery',
              type: 'array',
              minRows: 1,
              localized: true,
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'images',
                  required: true,
                },
                {
                  name: 'variantOption',
                  type: 'relationship',
                  relationTo: 'variantOptions',
                  admin: {
                    condition: (data) => {
                      return (
                        data?.enableVariants === true &&
                        Array.isArray(data?.variantTypes) &&
                        data.variantTypes.length > 0
                      );
                    },
                  },
                  filterOptions: ({ data }) => {
                    if (data?.enableVariants && data?.variantTypes?.length) {
                      const variantTypeIDs = (data.variantTypes as unknown[])
                        .map((item) => {
                          if (typeof item === 'object' && item !== null && 'id' in item) {
                            return (item as { id: DefaultDocumentIDType }).id;
                          }
                          return item as DefaultDocumentIDType;
                        })
                        .filter(
                          (id): id is DefaultDocumentIDType =>
                            typeof id === 'string' || typeof id === 'number',
                        );

                      if (variantTypeIDs.length === 0) {
                        return { variantType: { in: [] } };
                      }

                      const query: Where = { variantType: { in: variantTypeIDs } };
                      return query;
                    }

                    return { variantType: { in: [] } };
                  },
                },
              ],
            },
          ],
          label: {
            en: translations.en.common.content,
            pl: translations.pl.common.content,
          },
        },
        {
          fields: [
            ...(defaultCollection?.fields ?? []),
            {
              name: 'relatedProducts',
              type: 'relationship',
              filterOptions: ({ id }) => {
                if (id) return { id: { not_in: [id] } };
                return { id: { exists: true } };
              },
              hasMany: true,
              relationTo: 'products',
            },
          ],
          label: 'Product Details',
        },
        {
          name: 'meta',
          label: {
            en: translations.en.fields.seo,
            pl: translations.pl.fields.seo,
          },
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({ hasGenerateFn: true }),
            MetaImageField({ relationTo: 'images' }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
        sortOptions: 'title',
      },
      hasMany: true,
      relationTo: 'categories',
    },
    ...createSlugField(),
  ],
  hooks: {
    ...defaultCollection?.hooks,
    afterChange: [...(defaultCollection?.hooks?.afterChange ?? []), revalidateProduct],
    afterDelete: [...(defaultCollection?.hooks?.afterDelete ?? []), revalidateProductDelete],
    beforeChange: [...(defaultCollection?.hooks?.beforeChange ?? []), populatePublishedAt],
  },
});

export { ProductsCollection };
