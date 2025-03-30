import { Archive } from '@/_old/blocks/ArchiveBlock/config';
import { CallToAction } from '@/_old/blocks/CallToAction/config';
import { Content } from '@/_old/blocks/Content/config';
import { generatePreviewPath } from '@/_old/utilities/generatePreviewPath';
import { hero1BlockPayloadConfig } from '@/components/blocks/hero/hero-1/hero-1.payload.config';
import { imageBlock1BlockPayloadConfig } from '@/components/blocks/image-block/image-block-1/image-block-1.payload.config';
import { imageBlocksBlockPayloadConfig } from '@/components/blocks/image-block/image-blocks/image-blocks.payload.config';
import { AdminTranslations, customTranslations } from '@/config/locales.config';
import { Page } from '@/payload.types';
import { authenticated } from '@/payload/access/authenticated';
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished';
import { slugField } from '@/payload/fields/slug';
import { populatePublishedAt } from '@/payload/hooks/populatePublishedAt';
import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields';
import { SupportedLanguages } from '@payloadcms/translations';
import type { CollectionConfig } from 'payload';
import { fromPairs } from 'ramda';
import { revalidatePage } from './hooks/revalidatePage';

const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: ({ t }: { t: AdminTranslations }) => t('collections:pages:singular'),
    plural: ({ t }: { t: AdminTranslations }) => t('collections:pages:plural'),
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
    breadcrumbs: true,
    path: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const slug = typeof data?.slug === 'string' ? data.slug : '';
        const path = generatePreviewPath({
          slug,
          path: `/${req.locale}${data.path}`.replace(/[^/]+$/, slug),
          collection: 'pages',
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) => {
      const slug = typeof data?.slug === 'string' ? data.slug : '';
      return generatePreviewPath({
        slug,
        path: `/${req.locale}${data.path}`.replace(/[^/]+$/, slug),
        collection: 'pages',
        req,
      });
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:title'),
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [
            {
              name: 'sections',
              type: 'blocks',
              blocks: [
                hero1BlockPayloadConfig,
                imageBlocksBlockPayloadConfig,
                imageBlock1BlockPayloadConfig,
                Archive,
                CallToAction,
                Content,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
              labels: {
                singular: {
                  en: customTranslations.en.common.section.singular,
                  pl: customTranslations.pl.common.section.singular,
                },
                plural: {
                  en: customTranslations.en.common.section.plural,
                  pl: customTranslations.pl.common.section.plural,
                },
              },
            },
          ],
          label: {
            en: customTranslations.en.common.content,
            pl: customTranslations.pl.common.content,
          },
        },
        {
          name: 'seo',
          label: {
            en: customTranslations.en.fields.seo,
            pl: customTranslations.pl.fields.seo,
          },
          fields: [
            MetaTitleField({
              hasGenerateFn: true,
              overrides: {
                label: ({ t }: { t: AdminTranslations }) => t('fields:title'),
              },
            }),
            MetaDescriptionField({
              overrides: {
                label: ({ t }: { t: AdminTranslations }) => t('fields:description'),
              },
            }),
            MetaImageField({
              relationTo: 'images',
              overrides: {
                label: ({ t }: { t: AdminTranslations }) => t('fields:image'),
                localized: false,
              },
            }),
          ],
        },
        {
          name: 'subpages',
          virtual: true,
          label: {
            en: customTranslations.en.fields.subpages,
            pl: customTranslations.pl.fields.subpages,
          },
          fields: [
            {
              name: 'children',
              type: 'join',
              on: 'parent',
              collection: 'pages',
              label: ({ t }: { t: AdminTranslations }) => t('fields:children'),
            },
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      label: ({ t }: { t: AdminTranslations }) => t('fields:publishedAt'),
    },
    ...slugField(),
    {
      name: 'path',
      type: 'text',
      virtual: true,
      localized: true,
      label: ({ t }: { t: AdminTranslations }) => t('fields:path'),
      admin: {
        hidden: false,
        position: 'sidebar',
        readOnly: true,
        components: {
          Field: {
            path: '@/payload/fields/slug/SlugComponent#SlugComponent',
            clientProps: {
              fieldToUse: 'slug',
              checkboxFieldPath: 'pathLock',
            },
          },
        },
      },
    },
    {
      name: 'pathLock',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        hidden: true,
        position: 'sidebar',
      },
    },
    createParentField('pages', {
      label: ({ t }: { t: AdminTranslations }) => t('fields:parent'),
    }),
    createBreadcrumbsField('pages', { admin: { hidden: true } }),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeRead: [
      ({ doc, req }) => {
        if (!doc) return;

        const pathPerLocale = fromPairs(
          Object.entries(doc.breadcrumbs ?? {}).map(
            ([key, value]: [keyof SupportedLanguages, Page['breadcrumbs']]) => {
              return [key, value!.at(-1)?.url ?? '/'];
            },
          ),
        );

        doc.path = pathPerLocale[req.locale ?? 'all'] ?? pathPerLocale;
      },
    ],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
    },
    maxPerDoc: 50,
  },
};

export { Pages };
