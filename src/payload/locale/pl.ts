import { customTranslations as en } from './en';

export const customTranslations = {
  groups: {
    layout: {
      singular: 'Układ',
      plural: 'Układy',
    },
  },
  fields: {
    title: {
      singular: 'Tytuł',
      plural: 'Tytuły',
    },
  },
  collections: {
    pages: {
      singular: 'Strona',
      plural: 'Strony',
    },
    categories: {
      singular: 'Kategoria',
      plural: 'Kategorie',
    },
    posts: {
      singular: 'Post',
      plural: 'Posty',
    },
    users: {
      singular: 'Użytkownik',
      plural: 'Użytkownicy',
    },
  },
} satisfies typeof en;
