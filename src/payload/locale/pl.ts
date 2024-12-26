import { customTranslations as en } from './en';

export const customTranslations = {
  common: {
    content: 'Content',
    layout: 'Layout',
    section: {
      singular: 'Section',
      plural: 'Sections',
    },
    related: {
      singular: 'Powiązany',
      plural: 'Powiązane',
    },
  },
  fields: {
    label: 'Etykieta',
    slug: 'Slug',
    path: 'Ścieżka',
    title: 'Tytuł',
    heading: 'Naglówek',
    description: 'Opis',
    image: 'Zdjęcie',
    publishedAt: 'Data Publikacji',
    fullName: 'Imię i Nazwisko',
    parent: 'Element Nadrzędny',
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
