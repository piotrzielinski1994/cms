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
    label: 'Etykieta',
    title: 'Tytuł',
    description: 'Opis',
    image: 'Zdjęcie',
    publishedAt: 'Data publikacji',
    fullName: 'Imię i Nazwisko',
    parent: 'Element nadrzędny',
    role: {
      singular: 'Rola',
      plural: 'Role',
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
    sites: {
      singular: 'Witryna',
      plural: 'Witryny',
    },
    users: {
      singular: 'Użytkownik',
      plural: 'Użytkownicy',
    },
  },
  enums: {
    role: {
      user: 'Użytkownik',
      editor: 'Edytor',
      admin: 'Administrator',
    },
  },
  components: {
    header: 'Nagłówek',
    footer: 'Stopka',
  },
} satisfies typeof en;
