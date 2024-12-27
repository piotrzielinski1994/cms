import { customTranslations as en } from './en';

export const customTranslations = {
  common: {
    content: 'Treść',
    layout: 'Układ',
    section: {
      singular: 'Sekcja',
      plural: 'Sekcje',
    },
    related: {
      singular: 'Powiązany',
      plural: 'Powiązane',
    },
    openInNewTab: 'Otwórz w nowej karcie',
  },
  fields: {
    label: 'Etykieta',
    slug: 'Slug',
    path: 'Ścieżka',
    type: 'Typ',
    title: 'Tytuł',
    heading: 'Naglówek',
    subheading: 'Podnagłówek',
    description: 'Opis',
    image: 'Zdjęcie',
    publishedAt: 'Data publikacji',
    fullName: 'Imię i nazwisko',
    parent: 'Element nadrzędny',
    role: {
      singular: 'Rola',
      plural: 'Role',
    },
    menu: 'Menu',
    submenu: 'Submenu',
    navItem: 'Element nawigacji',
    internalLink: 'Wewnętrzny link',
    documentToLinkTo: 'Dokument do podlinkowania',
    cta: 'CTA',
    selector: 'Selektor',
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
