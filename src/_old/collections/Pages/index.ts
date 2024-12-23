import type { CollectionConfig } from 'payload';

import { authenticated } from '@/_old/access/authenticated';
import { authenticatedOrPublished } from '@/_old/access/authenticatedOrPublished';
import { Archive } from '@/_old/blocks/ArchiveBlock/config';
import { CallToAction } from '@/_old/blocks/CallToAction/config';
import { Content } from '@/_old/blocks/Content/config';
import { FormBlock } from '@/_old/blocks/Form/config';
import { MediaBlock } from '@/_old/blocks/MediaBlock/config';
import { slugField } from '@/_old/fields/slug';
import { hero } from '@/_old/heros/config';
import { populatePublishedAt } from '@/_old/hooks/populatePublishedAt';
import { generatePreviewPath } from '@/_old/utilities/generatePreviewPath';
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage';

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields';

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  labels: {
    singular: {
      en: 'Page',
      pl: 'Strona',
    },
    plural: {
      en: 'Pages',
      pl: 'Strony',
    },
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
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
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
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
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
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    beforeDelete: [revalidateDelete],
    beforeRead: [
      ({ doc }) => {
        if (doc) {
          doc.localizedSlugs =
            typeof doc.slug === 'object'
              ? doc.slug
              : {
                  en: doc.slug,
                };
        }
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
