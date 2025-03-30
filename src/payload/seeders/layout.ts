import { Config, Header, Page } from '@/payload.types';
import { GlobalSlug, Payload } from 'payload';
import { contentLocale } from '../locale';
import { createGlobal } from './helpers/globals';

const seedLayoutItems = async (payload: Payload) => {
  const pagesPerLocale = await Promise.all(
    contentLocale.list.map(async (locale) => {
      const pages = await payload.find({
        collection: 'pages',
        locale,
        pagination: false,
        draft: false,
        where: {
          parent: { not_equals: null },
        },
        select: {
          title: true,
        },
      });
      return [locale, pages.docs] as unknown as [typeof contentLocale.list, Page[]];
    }),
  );
  const navItemsPerLocale: Record<Config['locale'], Header['navItems']> = Object.fromEntries(
    pagesPerLocale.map(([locale, pages]) => [
      locale,
      pages.map((page) => ({
        link: {
          type: 'reference',
          label: page.title,
          reference: {
            relationTo: 'pages',
            value: page.id,
          },
        },
      })),
    ]),
  );

  const {
    [contentLocale.default]: mainLocaleNavItems,
    ...untypedRestNavItems
  }: { [key: string]: Header['navItems'] } = navItemsPerLocale;
  const restNavItems = untypedRestNavItems as Record<Config['locale'], Header['navItems']>;

  const layoutElements: GlobalSlug[] = ['header', 'footer'];
  return layoutElements.map((slug) => {
    return createGlobal(payload, { slug, data: { navItems: mainLocaleNavItems } }, (g) => ({
      pl: {
        slug,
        data: {
          navItems: (restNavItems.pl ?? []).map((navItem, idx) => ({
            ...navItem,
            id: g.navItems?.[idx].id,
          })),
        },
      },
    }));
  });
};

export { seedLayoutItems };
