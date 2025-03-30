import { Config, Page } from '@/payload.types';
import { contentLocale } from '@/payload/locale';
import { toEntries } from '@/utils/object';
import { Payload } from 'payload';

type PageToCreate = Omit<Page, 'createdAt' | 'id' | 'sizes' | 'updatedAt'>;

export const createPage = async (
  payload: Payload,
  mainLocalePage: PageToCreate,
  getLocalizedPages: (
    page: Page,
  ) => Omit<Record<Config['locale'], PageToCreate>, typeof contentLocale.default>,
) => {
  const page = await payload.create({
    collection: 'pages',
    locale: contentLocale.default,
    data: mainLocalePage,
  });

  for (const [locale, data] of toEntries(getLocalizedPages(page))) {
    await payload.update({
      collection: 'pages',
      id: page.id,
      locale,
      data,
    });
  }

  return page;
};
