import type { CollectionConfig } from 'payload';

import { generatePreviewPath } from '@/_old/utilities/generatePreviewPath';
import { hero1BlockPayloadConfig } from '@/components/blocks/hero/hero-1/hero-1.payload.config';
import { imageBlocksBlockPayloadConfig } from '@/components/blocks/image-block/image-blocks/image-blocks.payload.config';
import { authenticated } from '@/payload/access/authenticated';
import { authenticatedOrPublished } from '@/payload/access/authenticatedOrPublished';
import { slugField } from '@/payload/fields/slug';
import { populatePublishedAt } from '@/payload/hooks/populatePublishedAt';
import { AdminTranslations, ContentLocale, customTranslations } from '@/payload/locale';
import { Page } from '@/payload/payload.types';
import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

export const Pages: CollectionConfig<'pages'> = {
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
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
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
              blocks: [hero1BlockPayloadConfig, imageBlocksBlockPayloadConfig],
              required: false,
              admin: {
                initCollapsed: true,
              },
              label: ({ t }: { t: AdminTranslations }) => t('common:section:plural'),
            },
          ],
          label: {
            en: customTranslations.en.common.content,
            pl: customTranslations.pl.common.content,
          },
        },
        {
          name: 'seo',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'seo.title',
              descriptionPath: 'seo.description',
              imagePath: 'seo.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'seo.title',
              descriptionPath: 'seo.description',
            }),
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

        const pathPerLocale = Object.fromEntries(
          Object.entries(doc.breadcrumbs ?? {}).map(
            ([key, value]: [ContentLocale, Page['breadcrumbs']]) => {
              return [key, value!.at(-1)?.url ?? '/'];
            },
          ),
        );

        doc.path = pathPerLocale[req.locale ?? 'all'] ?? pathPerLocale;
      },
    ],
    beforeDelete: [revalidateDelete],
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
