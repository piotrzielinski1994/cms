import { defaultContentLocale } from '@/config/locales.config';
import { Config, Page } from '@/payload.types';
import { Payload } from 'payload';
import { toPairs } from 'ramda';

type PageToCreate = Omit<Page, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>;

const createPage = async (
  payload: Payload,
  mainLocalePage: PageToCreate,
  getLocalizedPages: (
    page: Page,
  ) => Omit<Record<Config['locale'], PageToCreate>, typeof defaultContentLocale>,
) => {
  const page = await payload.create({
    collection: 'pages',
    locale: defaultContentLocale,
    data: mainLocalePage,
  });

  for (const [locale, data] of toPairs(getLocalizedPages(page))) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      data,
    });
  }

  return page;
};

export { createPage };
