import { customTranslations as en } from './en';

export const customTranslations = {
  common: {
    related: {
      singular: 'Powiązany',
      plural: 'Powiązane',
    },
  },
  groups: {
    layout: 'Układ',
  },
  tabs: {
    content: 'Treść',
  },
  fields: {
    title: 'Tytuł',
    description: 'Opis',
    image: 'Zdjęcie',
    publishedAt: 'Data publikacji',
    fullName: 'Imię i Nazwisko',
    parent: 'Element nadrzędny',
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
