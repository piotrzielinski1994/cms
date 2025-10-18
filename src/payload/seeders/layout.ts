import { contentLocales, defaultContentLocale } from '@/config/store/locales.config';
import { Config, Header, Page } from '@/payload.types';
import { DataFromGlobalSlug, GlobalSlug, Payload } from 'payload';
import { fromPairs } from 'ramda';
import { createGlobal } from './helpers/globals';

const seedLayoutItems = async (payload: Payload) => {
  const pagesPerLocale = await Promise.all(
    contentLocales.map(async (locale) => {
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
      return [locale, pages.docs] as [typeof locale, Page[]];
    }),
  );
  const navItemsPerLocale: Record<Config['locale'], Header['navItems']> = fromPairs(
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
    [defaultContentLocale]: mainLocaleNavItems,
    ...untypedRestNavItems
  }: { [key: Config['locale'][number]]: Header['navItems'] } = navItemsPerLocale;
  const restNavItems = untypedRestNavItems as Record<Config['locale'], Header['navItems']>;

  const layoutElements = ['header', 'footer'] satisfies GlobalSlug[];
  return layoutElements.map((slug) => {
    return createGlobal(
      payload,
      { slug, data: { navItems: mainLocaleNavItems } },
      (g: DataFromGlobalSlug<typeof slug>) => ({
        pl: {
          slug,
          data: {
            navItems: (restNavItems.pl ?? []).map((navItem, idx) => ({
              ...navItem,
              id: g.navItems?.[idx].id,
            })),
          },
        },
      }),
    );
  });
};

export { seedLayoutItems };
