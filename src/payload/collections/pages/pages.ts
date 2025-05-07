import { Archive } from '@/_old/blocks/ArchiveBlock/config';
import { CallToAction } from '@/_old/blocks/CallToAction/config';
import { Content } from '@/_old/blocks/Content/config';
import { generatePreviewPath } from '@/_old/utilities/generatePreviewPath';
import { faqSectionPayloadConfig } from '@/components/sections/faq/faq.payload.config';
import { contactUsSectionPayloadConfig } from '@/components/sections/form/contact-us/contact-us.payload.config';
import { hero1SectionPayloadConfig } from '@/components/sections/hero/hero-1/hero-1.payload.config';
import { imageBlock1BlockPayloadConfig } from '@/components/sections/image-block/image-block-1/image-block-1.payload.config';
import { imageBlocksSectionPayloadConfig } from '@/components/sections/image-block/image-blocks/image-blocks.payload.config';
import { AdminTranslations, translations } from '@/config/locales.config';
import { Page } from '@/payload.types';
import { createSlugField } from '@/payload/fields/slug/slug';
import { populatePublishedAt } from '@/payload/hooks/populatePublishedAt';
import { authenticated, authenticatedOrPublished } from '@/payload/utils/access';
import { createBreadcrumbsField, createParentField } from '@payloadcms/plugin-nested-docs';
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
} from '@payloadcms/plugin-seo/fields';
import { Locale } from 'next-intl';
import type { CollectionConfig } from 'payload';
import { fromPairs, toPairs } from 'ramda';
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
                hero1SectionPayloadConfig,
                imageBlocksSectionPayloadConfig,
                imageBlock1BlockPayloadConfig,
                contactUsSectionPayloadConfig,
                faqSectionPayloadConfig,
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
                  en: translations.en.common.section.singular,
                  pl: translations.pl.common.section.singular,
                },
                plural: {
                  en: translations.en.common.section.plural,
                  pl: translations.pl.common.section.plural,
                },
              },
            },
          ],
          label: {
            en: translations.en.common.content,
            pl: translations.pl.common.content,
          },
        },
        {
          name: 'seo',
          label: {
            en: translations.en.fields.seo,
            pl: translations.pl.fields.seo,
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
            en: translations.en.fields.subpages,
            pl: translations.pl.fields.subpages,
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
    ...createSlugField(),
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
            path: '@/payload/components/computed-field#ComputedField',
            clientProps: {
              fieldToUse: 'slug',
              formatter: 'toPath',
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
          toPairs((doc.breadcrumbs ?? {}) as Record<Locale, Page['breadcrumbs']>).map(
            ([locale, breadcrumbs]) => [locale, breadcrumbs!.at(-1)?.url ?? '/'],
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
